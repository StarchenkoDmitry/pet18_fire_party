import { Logger } from "@nestjs/common";
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";

import { UserSocket } from "./gateway.interface";

import { UserRepository } from "src/user/user.repository";

import { ChatService } from "src/chat/chat.service";
import { UserService } from "src/user/user.service";

import { MeService } from "./services/me.service";
import { OnlineUsersService } from "./services/onlineUsers.service";
import { MyChatsService } from "./services/myChats.service";

import { IUserForSearch } from "src/common/user.interface";

import { verifyName, verifySurname } from "src/utils/Validations";

import {
    ICreateMessage,
    IDeleteChat,
    IRemoveMessage,
    ISearchForUsers,
    ISetName,
    ISetSurname,
    ISubscribeOnChat,
    ServerNameActions,
} from "src/common/gateway.interfaces";

@WebSocketGateway({
    cors: { origin: true, credentials: true },
    pingInterval: 2000,
    pingTimeout: 3000,
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly userRepository: UserRepository,

        private readonly userService: UserService,
        private readonly chatService: ChatService,

        private readonly onlineUsers: OnlineUsersService,
        private readonly meService: MeService,
        private readonly myChatsService: MyChatsService
    ) {}

    private readonly logger = new Logger(Gateway.name);

    @WebSocketServer() server: Server;

    handleConnection(client: UserSocket, ...args: any[]) {
        this.logger.log(`Connected id:${client.id}`);

        this.onlineUsers.setUserOnline(client);
    }
    handleDisconnect(client: UserSocket) {
        this.logger.log(`Disconnected id:${client.id}`);

        this.onlineUsers.setUserOffline(client);
        this.onlineUsers.unsubOnOnline(client);

        if (client.cancelSubOnChat) client.cancelSubOnChat();

        if (client.subscribesOnUsersFromChat) {
            client.subscribesOnUsersFromChat.forEach((unsub) => unsub());
            client.subscribesOnUsersFromChat = undefined;
        }
    }

    @SubscribeMessage(ServerNameActions.subscribeOnMe)
    async subOnMe(client: UserSocket, data: any) {
        console.log(ServerNameActions.subscribeOnMe);
        await this.meService.subscribe(client);
    }

    @SubscribeMessage(ServerNameActions.subscribeOnChats)
    async subOnMeChats(client: UserSocket, data: any) {
        console.log(ServerNameActions.subscribeOnChats);
        await this.myChatsService.subscribe(client);
    }

    @SubscribeMessage(ServerNameActions.createMessage)
    async createMessage(client: UserSocket, { chatId, text }: ICreateMessage) {
        console.log("addMessage data:", { chatId, text });
        return await this.chatService.createMessage(chatId, client.userId, text);
    }

    @SubscribeMessage(ServerNameActions.removeMessage)
    async removeMessage(client: UserSocket, { chatId, messageId }: IRemoveMessage) {
        console.log("removeMessage:", { chatId, messageId });
        return await this.chatService.removeMessage(chatId, messageId, client.userId);
    }

    @SubscribeMessage(ServerNameActions.subscribeOnChat)
    async subscribeOnChat(client: UserSocket, { chatId }: ISubscribeOnChat) {
        console.log("subOnChat data:", { chatId });
        await this.chatService.subscribeOnChat(chatId, client.userId, client);
    }

    @SubscribeMessage(ServerNameActions.subscribeOnChangeOnline)
    async subscribeOnChangeOnline(client: UserSocket, data: any) {
        const myFriends = await this.userRepository.getMyFriends(client.userId);
        const myFriendsOnline = this.onlineUsers.subscribeOnOnline(client, myFriends);
        return myFriendsOnline;
    }

    @SubscribeMessage(ServerNameActions.setName)
    async changeName(client: UserSocket, { name }: ISetName): Promise<boolean> {
        console.log("changeName data:", name);
        if (!verifyName(name)) return false;
        const res = await this.userService.setName(client.userId, name);
        return !!res;
    }

    @SubscribeMessage(ServerNameActions.setSurname)
    async changeSurname(client: UserSocket, { surname }: ISetSurname): Promise<boolean> {
        console.log("changeSurname data:", surname);
        if (!verifySurname(surname)) return false;
        const res = await this.userService.setSurname(client.userId, surname);
        return !!res;
    }

    @SubscribeMessage(ServerNameActions.searchForUsers)
    async searchUser(client: UserSocket, { name }: ISearchForUsers): Promise<IUserForSearch[]> {
        console.log("searchUsers data:", name);
        const users = await this.userRepository.findManyByNameWhoNoFriend(client.userId, name);
        if (!users) return;
        return users.map(({ id, name, surname, imageID }) => ({
            id,
            name,
            surname,
            imageID,
        }));
    }

    @SubscribeMessage(ServerNameActions.deleteChat)
    async deleteChat(client: UserSocket, { chatId }: IDeleteChat): Promise<boolean> {
        console.log("deleteChat data:", chatId);
        const resDelete = await this.chatService.remove(client.userId, chatId);
        return resDelete;
    }
}
