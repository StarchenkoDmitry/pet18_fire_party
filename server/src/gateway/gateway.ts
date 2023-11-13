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
import { IUser, IUserForMe } from "src/common/user.interface";
import { IMyChat } from "src/common/me.interface";

import { UserRepository } from "src/user/user.repository";
import { ISubOnChat, IResSubOnChat } from "src/common/gateway.interfaces";
import { ChatService } from "src/chat/chat.service";
import { UsersOnlineService } from "./services/usersOnline.service";
import { UserService } from "src/user/user.service";

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
    private readonly onlines: UsersOnlineService
    ) {}

  private readonly logger = new Logger(Gateway.name)
  @WebSocketServer() server: Server

  handleConnection(user: UserSocket, ...args: any[]) {
    this.logger.log(`Connected id:${user.id}`)

    this.onlines.setUserOnline(user)
  }
  handleDisconnect(user: UserSocket) {
    this.logger.log(`Disconnected id:${user.id}`)

    this.onlines.setUserOffline(user)
    if(user.subChat) user.subChat()
    this.onlines.unsubOnOnline(user)
  }

  @SubscribeMessage("getMe")
  async getMe(client: UserSocket, data: any):Promise<IUserForMe> {
    // console.log("gateway/getMe",data,client.userSession)
    const user: IUser = await this.userRepository.findOneBySession(client.userSession)
    if(!user) return
    const {passwordHash,session, ...me} = user
    return me
  }

  @SubscribeMessage("getMyChats")
  async getMeChats(client: UserSocket, data: any):Promise<IMyChat[]> {
    // console.log("getMyChats data, session: ",data,client.userSession)
    return await this.userRepository.getMyChats(client.userId)
  }

  @SubscribeMessage("createMessage")
  async createMessage(client: UserSocket, data: any){
    console.log("addMessage data:", data)
    return await this.chatService.createMessage(data.chatId,client.userId,data.text)
  }

  @SubscribeMessage("removeMessage")
  async removeMessage(client: UserSocket, { chatId, messageId }: any){
    console.log("removeMessage:", { chatId, messageId })
    return await this.chatService.removeMessage(chatId,messageId,client.userId)
  }

  @SubscribeMessage("subOnChat")
  async subscribeOnChat(client: UserSocket, {chatId}: ISubOnChat):Promise<IResSubOnChat>{
    console.log("subOnChat data:",{chatId})
    const chatData = await this.chatService.subscribeOnChat(chatId, client.userId, client)
    return chatData
  }
  
  @SubscribeMessage("subOnChangeOnline")
  async subscribeOnChangeOnline(client: UserSocket, data:any){
    const myFriends = await this.userRepository.getMyFriends(client.userId)
    const myFriendsOnline = this.onlines.subscribeOnOnline(client,myFriends)
    return myFriendsOnline
  }

  @SubscribeMessage("changeName")
  async changeName(client: UserSocket, data:string){
    console.log("changeName data:",data)
    const res = await this.userService.setName(client.userId,data)
    client.emit("changeMe",{
      type:"setName",
      payload:data
    })
    return !!res
  }

  @SubscribeMessage("changeSurname")
  async changeSurname(client: UserSocket, data:string){
    console.log("changeSurname data:",data)
    const res = await this.userService.setSurname(client.userId,data)
    client.emit("changeMe",{
      type:"setSurname",
      payload:data
    })
    return !!res
  }
}
