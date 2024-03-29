import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Chat, Message } from "@prisma/client";
import { IChatIncludeUsers } from "./chat.interface";
import { IMessage } from "src/common/message.interface";
import { IChatWithUser } from "src/common/chat.interface";

@Injectable()
export class ChatRepository {
    constructor(private prisma: PrismaService) {
        console.log("constructor ChatRepository");
    }

    async create(userId: string, friendId: string) {
        if (userId === friendId) {
            throw "You can not to create a chat with yourself";
        }

        const chat = await this.prisma.chat.findFirst({
            where: {
                AND: [
                    {
                        users: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                    {
                        users: {
                            some: {
                                id: friendId,
                            },
                        },
                    },
                ],
            },
        });

        if (chat) {
            console.log(`ChatRepository create(${userId}, ${friendId}) error chat is exist.`);
            console.log("Chat: ", chat);
            return;
        }

        const newChat = await this.prisma.chat.create({
            data: {
                users: {
                    connect: [{ id: userId }, { id: friendId }],
                },
            },
        });
        return newChat;
    }

    async remove(userId: string, chatId: string) {
        console.log(`ChatRepository-remove`, userId, chatId);
        const chat = await this.prisma.chat.findFirst({
            where: {
                id: chatId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
        });

        if (!chat) {
            console.log(`ChatRepository-remove error: chat is exist.`, chat);
            return false;
        }

        const resDeleteMessage = await this.prisma.message.deleteMany({
            where: {
                chatId: chatId,
            },
        });
        console.log(`ChatRepository-remove resDeleteMessage:`, resDeleteMessage);
        if (!resDeleteMessage) {
            return false;
        }

        const resDelete = await this.prisma.chat.delete({
            where: {
                id: chatId,
            },
        });
        console.log(`ChatRepository-remove resDelete:`, resDelete);
        if (!resDelete) return false;

        return true;
    }

    async getIncludeUsers(chatId: string): Promise<IChatIncludeUsers> {
        return await this.prisma.chat.findFirst({
            where: { id: chatId },
            include: {
                users: true,
            },
        });
    }

    async getMy(chatId: string, userId: string): Promise<IChatWithUser> {
        // console.log("getMy chatId, userId:",chatId,userId)
        const resData = await this.prisma.chat.findFirst({
            where: { id: chatId },
            include: {
                users: {
                    where: {
                        id: {
                            not: userId,
                        },
                    },
                    select: {
                        id: true,
                        name: true,
                        imageID: true,
                    },
                },
            },
        });
        // console.log(`ChatRepository-getMy resData:`,resData)
        if (!resData) return;

        const { users, id, lastMessageID } = resData;
        if (users.length !== 1) {
            throw new Error("users length !== 1");
        }
        return {
            id,
            lastMessageID,
            user: users[0],
        };
    }

    async createMessage(
        chatId: string,
        userId: string,
        text: string
    ): Promise<Message | undefined> {
        try {
            // console.log("createMessage chatId:", chatId, "userId:",userId, "text:", text)
            const mes: Message | undefined = await this.prisma.$transaction(
                async (tx): Promise<Message | undefined> => {
                    const chat = await tx.chat.findFirst({
                        where: {
                            id: chatId,
                            AND: {
                                users: {
                                    some: {
                                        id: userId,
                                    },
                                },
                            },
                        },
                    });

                    if (!chat)
                        throw new Error(`chat(${chatId}) with user(${userId}) doesn't exist`);
                    // console.log("createMessage chat:",chat)

                    const newMessage = await tx.message.create({
                        data: {
                            text: text,
                            chatId: chatId,
                            userID: userId,
                            prevMessageID: chat.lastMessageID,
                        },
                    });

                    if (!newMessage) throw new Error("message not created");
                    // console.log("createMessage newMessage:",newMessage)

                    // console.log("createMessage chat.update chat.id:",chat.id)
                    const resUpdate = await tx.chat.update({
                        where: { id: chat.id },
                        data: {
                            lastMessageID: newMessage.id,
                        },
                    });

                    if (!resUpdate) throw new Error("failed to update lastMessageID field");
                    // console.log("createMessage resUpdate:",resUpdate)

                    // console.log("createMessage done:",newMessage)
                    return newMessage;
                },
                { isolationLevel: "Serializable" }
            );
            return mes;
        } catch (error) {
            console.log("createMessage error:", error);
        }
    }

    async getAllMessages(chatid: string, userid: string): Promise<IMessage[]> {
        const chat = await this.prisma.chat.findFirst({
            where: {
                id: chatid,
                AND: {
                    users: {
                        some: {
                            id: userid,
                        },
                    },
                },
            },
        });
        if (chat) {
            const messages: IMessage[] = [];
            let lastMessageID = chat.lastMessageID;
            let maxGetMessages = 256;
            while (lastMessageID && maxGetMessages-- > 0) {
                const message = await this.prisma.message.findFirst({
                    where: { id: lastMessageID },
                });
                if (!message) {
                    lastMessageID = null;
                    continue;
                }
                messages.push({
                    id: message.id,
                    text: message.text,
                    createAt: message.createAt,
                    prevMessageID: message.prevMessageID,
                    chatId: message.chatId,
                    userID: message.userID,
                });
                lastMessageID = message.prevMessageID;
            }
            return messages;
        }
        return;
    }

    async getAll(): Promise<Chat[]> {
        return this.prisma.chat.findMany();
    }

    async removeMessage(chatId: string, messageId: string, userId: string): Promise<Message> {
        //TODO: finalize the check that this message is in the chat room where our user is.
        const message = await this.prisma.message.findFirst({
            where: {
                id: messageId,
            },
            include: {
                nextMessage: true,
            },
        });
        
        if (!message) {
            console.error(
                `ChatRepository removeMessage(${chatId}, ${messageId}, ${userId}) message is not exist`
            );
            return;
        }

        if (message.nextMessage.length > 1) {
            console.error(
                `ChatRepository removeMessage messageId(${message.id}): ${message} (lenght > 1) nextMessage[${message.nextMessage}]`
            );
            return;
        }

        const nextMessageId = message.nextMessage.length === 1 ? message.nextMessage[0].id : null;
        const prevMessageId = message.prevMessageID;
        console.log("nextMessageId, prevMessageID: ", nextMessageId, prevMessageId);
        if (nextMessageId) {
            if (prevMessageId) {
                const resNextMessage = await this.prisma.message.update({
                    data: {
                        prevMessageID: prevMessageId,
                    },
                    where: {
                        id: nextMessageId,
                    },
                });
            } else {
                const resMess = await this.prisma.message.update({
                    data: {
                        prevMessageID: null,
                    },
                    where: {
                        id: nextMessageId,
                    },
                });
            }
        } else {
            if (prevMessageId) {
                const resChadft = await this.prisma.chat.update({
                    data: {
                        lastMessageID: prevMessageId,
                    },
                    where: {
                        id: chatId,
                    },
                });
            } else {
                const resChadft = await this.prisma.chat.update({
                    data: {
                        lastMessageID: null,
                    },
                    where: {
                        id: chatId,
                    },
                });
            }
        }

        const deletedMessage = await this.prisma.message.delete({
            where: {
                id: messageId,
            },
        });
        return deletedMessage;
    }
}
