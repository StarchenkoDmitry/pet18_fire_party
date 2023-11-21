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
import { IUserForSearch } from "src/common/user.interface";
import { TypeEventMe, EventMe, ME_EVENT_CHAT_INIT } from "src/common/me.interface";

import { UserRepository } from "src/user/user.repository";
import { ChatService } from "src/chat/chat.service";
import { UsersOnlineService } from "./services/usersOnline.service";
import { UserService } from "src/user/user.service";
import { verifyName, verifySurname } from "src/utils/validations";
import { MeService } from "./services/me.service";
import { IResSubOnChat, ISubOnChat } from "src/common/chat.interface";


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
    private readonly onlines: UsersOnlineService,
    private readonly meService: MeService,
  ) { }

  private readonly logger = new Logger(Gateway.name)

  @WebSocketServer() server: Server


  handleConnection(user: UserSocket, ...args: any[]) {
    this.logger.log(`Connected id:${user.id}`)

    this.onlines.setUserOnline(user)
  }
  handleDisconnect(user: UserSocket) {
    this.logger.log(`Disconnected id:${user.id}`)

    this.onlines.setUserOffline(user)
    if(user.cancelSubOnChat) user.cancelSubOnChat()
    this.onlines.unsubOnOnline(user)
  }


  @SubscribeMessage(TypeEventMe.subscribeOnMe)
  async subOnMe(client: UserSocket, data: any){
    console.log(TypeEventMe.subscribeOnMe)
    await this.meService.subscribe(client)
  }

  @SubscribeMessage(TypeEventMe.subscribeOnChats)
  async subOnMeChats(client: UserSocket, data: any){
    console.log(TypeEventMe.subscribeOnMe)
    await this.meService.subscribe(client)

    const chats = await this.userRepository.getMyChats(client.userId)
    const event : EventMe = {
      type: ME_EVENT_CHAT_INIT,
      data:{ chats }
    }
    client.emit(TypeEventMe.eventsOnChats,event)
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
  async changeName(client: UserSocket, name:string):Promise<boolean>{
    console.log("changeName data:",name)
    if(!verifyName(name)) return false
    const res = await this.userService.setName(client.userId,name)
    return !!res
  }

  @SubscribeMessage("changeSurname")
  async changeSurname(client: UserSocket, surname:string):Promise<boolean>{
    console.log("changeSurname data:",surname)
    if(!verifySurname(surname)) return false
    const res = await this.userService.setSurname(client.userId,surname)
    return !!res
  }

  
  @SubscribeMessage("searchUsers")
  async searchUser(client: UserSocket, name:string):Promise<IUserForSearch[]>{
    console.log("searchUsers data:",name)
    const users = await this.userRepository.findManyByNameWhoNoFriend(client.userId,name)
    if(!users) return
    return users.map(({id, name, surname, imageID})=>({
      id, name, surname, imageID
    }))
  }

  @SubscribeMessage("deleteChat")
  async deleteChat(client: UserSocket, chatId:string):Promise<boolean>{
    console.log("deleteChat data:",chatId)
    const resDelete = await this.chatService.remove(client.userId,chatId)
    return resDelete
  }
}
