import { Injectable } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";
import {
    CHAT_EVENT_ADDMESSAGE,
    CHAT_EVENT_DELETE_CHAT,
    CHAT_EVENT_ERROR_INIT,
    CHAT_EVENT_INIT,
    CHAT_EVENT_REMOVEMESSAGE,
    ChatEvent,
    IChatWithUser,
} from "src/common/chat.interface";
import { IChatIncludeUsers } from "./chat.interface";
import { Chat, Message } from "@prisma/client";
import { UserSocket } from "src/gateway/gateway.interface";
import { LockerService } from "src/locker/locker.service";
import { EventsService } from "src/events/events.service";
import { ClientNameActions } from "src/common/gateway.interfaces";
import { IMessage } from "src/common/message.interface";

@Injectable()
export class ChatService {
    constructor(
        private readonly locker: LockerService,
        private readonly events: EventsService,
        private readonly chatRepo: ChatRepository
    ) {
        console.log("constructor ChatService");
    }

    async create(userId: string, friendId: string): Promise<Chat> {
        await this.locker.mutexCreateChat.lock();

        const res = await this.chatRepo.create(userId, friendId);

        this.locker.mutexCreateChat.unlock();
        return res;
    }
    async remove(userId: string, chatId: string) {
        this.locker.mutexRemoveChat.lock();

        const resDelete = await this.chatRepo.remove(userId, chatId);

        this.locker.mutexRemoveChat.unlock();
        this.events.eventChats.emit(chatId, {
            type: CHAT_EVENT_DELETE_CHAT,
            data: { chatId },
        });
        return resDelete;
    }

    async getAll() {
        return await this.chatRepo.getAll();
    }

    async getIncludeUsers(chatId: string): Promise<IChatIncludeUsers> {
        await this.locker.mutexChats.lock(chatId);

        const res = await this.chatRepo.getIncludeUsers(chatId);

        this.locker.mutexChats.unlock(chatId);
        return res;
    }

    async getMy(chatId: string, userId: string): Promise<IChatWithUser> {
        await this.locker.mutexChats.lock(chatId);

        const res = await this.chatRepo.getMy(chatId, userId);

        this.locker.mutexChats.unlock(chatId);
        return res;
    }

    async createMessage(chatId: string, userId: string, text: string) {
        await this.locker.mutexChats.lock(chatId);

        const newMessage = await this.chatRepo.createMessage(chatId, userId, text);

        if (newMessage) {
            this.events.eventChats.emit(chatId, {
                type: CHAT_EVENT_ADDMESSAGE,
                data: newMessage,
            });
        }

        this.locker.mutexChats.unlock(chatId);
        return newMessage;
    }

    async removeMessage(chatId: string, messageId: string, userId: string): Promise<Message> {
        // if(!chatId || !messageId || !userId) throw new Error("params is not corect")
        await this.locker.mutexChats.lock(chatId);

        const removedMessage = await this.chatRepo.removeMessage(chatId, messageId, userId);

        if (removedMessage) {
            this.events.eventChats.emit(chatId, {
                type: CHAT_EVENT_REMOVEMESSAGE,
                data: removedMessage,
            });
        }

        this.locker.mutexChats.unlock(chatId);
        return removedMessage;
    }

    async getAllMessages(chatId: string, userId: string): Promise<IMessage[]> {
        await this.locker.mutexChats.lock(chatId);

        const messages = await this.chatRepo.getAllMessages(chatId, userId);

        this.locker.mutexChats.unlock(chatId);
        return messages;
    }

    async subscribeOnChat(chatId: string, userId: string, client: UserSocket) {
        if (client.cancelSubOnChat) {
            client.cancelSubOnChat();
            client.cancelSubOnChat = undefined;
        }

        await this.locker.mutexChats.lock(chatId);

        const resMyChat = await this.chatRepo.getMy(chatId, userId);
        // const messages = await this.getAllMessages(chatId,userId)
        const messages = await this.chatRepo.getAllMessages(chatId, userId);

        if (resMyChat) {
            client.cancelSubOnChat = this.events.eventChats.sub(chatId, (event) => {
                // console.log("onChatEvent event:", event)
                client.emit(ClientNameActions.onChatEvent, event);
            });

            const event: ChatEvent = {
                type: CHAT_EVENT_INIT,
                data: {
                    info: resMyChat,
                    messages: messages,
                },
            };

            client.emit(ClientNameActions.onChatEvent, event);
        } else {
            const event: ChatEvent = {
                type: CHAT_EVENT_ERROR_INIT,
                data: { chatId },
            };
            client.emit(ClientNameActions.onChatEvent, event);
        }

        this.locker.mutexChats.unlock(chatId);
    }
}
