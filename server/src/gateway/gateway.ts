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
import { IResSubOnChat, ISubOnChat } from "src/common/chat.interface";

import { verifyName, verifySurname } from "src/utils/validations";
import { ServerNameEvents } from "src/common/gateway.interfaces";


@WebSocketGateway(3020, {
  cors:{ origin:true, credentials: true, },
  pingInterval: 1000,
  pingTimeout: 1500,
})
export class Gateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly userRepository: UserRepository,

    private readonly userService: UserService,
    private readonly chatService: ChatService,

    private readonly onlineUsers: OnlineUsersService,
    private readonly meService: MeService,
    private readonly myChatsService :MyChatsService,
  ) { }

  private readonly logger = new Logger(Gateway.name)

  @WebSocketServer() server: Server


  handleConnection(client: UserSocket, ...args: any[]) {
    this.logger.log(`Connected id:${client.id}`)

    this.onlineUsers.setUserOnline(client)
  }
  handleDisconnect(client: UserSocket) {
    this.logger.log(`Disconnected id:${client.id}`)

    this.onlineUsers.setUserOffline(client)
    this.onlineUsers.unsubOnOnline(client)

    if(client.cancelSubOnChat) client.cancelSubOnChat()

    if(client.subscribesOnUsersFromChat){
      client.subscribesOnUsersFromChat.forEach(unsub=>unsub())
      client.subscribesOnUsersFromChat = undefined
    }
  }


  @SubscribeMessage(ServerNameEvents.subscribeOnMe)
  async subOnMe(client: UserSocket, data: any){
    console.log(ServerNameEvents.subscribeOnMe)
    await this.meService.subscribe(client)
  }


  @SubscribeMessage(ServerNameEvents.subscribeOnChats)
  async subOnMeChats(client: UserSocket, data: any){
    console.log(ServerNameEvents.subscribeOnChats)
    await this.myChatsService.subscribe(client)
  }


  @SubscribeMessage(ServerNameEvents.createMessage)
  async createMessage(client: UserSocket, data: any){
    console.log("addMessage data:", data)
    return await this.chatService.createMessage(data.chatId,client.userId,data.text)
  }

  @SubscribeMessage(ServerNameEvents.removeMessage)
  async removeMessage(client: UserSocket, { chatId, messageId }: any){
    console.log("removeMessage:", { chatId, messageId })
    return await this.chatService.removeMessage(chatId,messageId,client.userId)
  }


  @SubscribeMessage(ServerNameEvents.subOnChat)
  async subscribeOnChat(client: UserSocket, {chatId}: ISubOnChat){
    console.log("subOnChat data:",{chatId})
    await this.chatService.subscribeOnChat(chatId, client.userId, client)
  }
  
  @SubscribeMessage(ServerNameEvents.subOnChangeOnline)
  async subscribeOnChangeOnline(client: UserSocket, data:any){
    const myFriends = await this.userRepository.getMyFriends(client.userId)
    const myFriendsOnline = this.onlineUsers.subscribeOnOnline(client,myFriends)
    return myFriendsOnline
  }


  @SubscribeMessage(ServerNameEvents.changeName)
  async changeName(client: UserSocket, name:string):Promise<boolean>{
    console.log("changeName data:",name)
    if(!verifyName(name)) return false
    const res = await this.userService.setName(client.userId,name)
    return !!res
  }

  @SubscribeMessage(ServerNameEvents.changeSurname)
  async changeSurname(client: UserSocket, surname:string):Promise<boolean>{
    console.log("changeSurname data:",surname)
    if(!verifySurname(surname)) return false
    const res = await this.userService.setSurname(client.userId,surname)
    return !!res
  }


  @SubscribeMessage(ServerNameEvents.searchUsers)
  async searchUser(client: UserSocket, name:string):Promise<IUserForSearch[]>{
    console.log("searchUsers data:",name)
    const users = await this.userRepository.findManyByNameWhoNoFriend(client.userId,name)
    if(!users) return
    return users.map(({id, name, surname, imageID})=>({
      id, name, surname, imageID
    }))
  }

  @SubscribeMessage(ServerNameEvents.deleteChat)
  async deleteChat(client: UserSocket, chatId:string):Promise<boolean>{
    console.log("deleteChat data:",chatId)
    const resDelete = await this.chatService.remove(client.userId,chatId)
    return resDelete
  }
}
