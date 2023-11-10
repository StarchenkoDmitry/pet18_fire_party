import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
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

@WebSocketGateway(3020, {
  cors:{ origin:true, credentials: true, },
  pingInterval: 1000,
  pingTimeout: 1500,
})
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly chatService: ChatService,
    ) {}

  private readonly logger = new Logger(Gateway.name)

  @WebSocketServer() server: Server
  private readonly users = new Map<string,UserSocket>()

  afterInit() {
    // this.logger.log("Initialized")
  }

  handleConnection(client: UserSocket, ...args: any[]) {
    // const { sockets } = this.server.sockets
    // this.logger.log(`Client id: ${client.id} connected, user: ${client.userSession}`)
    // this.logger.debug(`Number of connected clients: ${sockets.size}`)
    this.logger.log(`Connected id:${client.id}`)
    this.users.set(client.id,client)
  }
  handleDisconnect(client: UserSocket) {
    // this.logger.log(`Cliend id:${client.id} disconnected`)
    this.logger.log(`Disconnected id:${client.id}`)

    if(!this.users.delete(client.id)){
      throw new Error('UserSocket dont exist in users')
    }

    if(client.subChat) client.subChat()
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

  @SubscribeMessage("addMessage")
  async addMessage(client: UserSocket, data: any){
    console.log("addMessage data:", data)
    return await this.chatService.createMessage(data.chatId,client.userId,data.text)
  }

  @SubscribeMessage("removeMessage")
  async removeMessage(client: UserSocket, { chatId, messageId }: any){
    console.log("removeMessage:", { chatId, messageId })
    return await this.chatService.removeMessage(chatId,messageId,client.userId)
  }

  @SubscribeMessage("subOnChat")
  async subsOnChat(client: UserSocket, {chatId}: ISubOnChat):Promise<IResSubOnChat>{
    // console.log("subOnChat data:",data)
    if(client.subChat){
      client.subChat()
      client.subChat = undefined
    } 

    const resSub = await this.chatService.subOnChat(chatId,client.userId,
      (event)=>{
        console.log("onChatEvent event:", event)
        client.emit("onChatEvent", event)
      }
    )
    
    if(!resSub) return

    client.subChat = resSub.unsub
    return resSub.chat
  }
  
  @SubscribeMessage("subOnChangeOnline")
  async subOnChangeOnline(client: UserSocket, {chatId}: ISubOnChat){
    return "BOOOOB"
  }
}

