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
import { ChatRepository } from "src/chat/chat.repository";
import { ReqSubChat, ResSubChat } from "src/common/gateway.interfaces";

@WebSocketGateway(3020, { 
  cors:{
    origin:true,
    credentials: true,
  },
  pingInterval: 1000,
  pingTimeout: 1500,
})
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository,
    ) {}

  private readonly logger = new Logger(Gateway.name)
  @WebSocketServer() server: Server
  
  chats: Map<string,any> = new Map();

  afterInit() {
    this.logger.log("Initialized")
  }

  handleConnection(client: UserSocket, ...args: any[]) {
    const { sockets } = this.server.sockets
    this.logger.log(`Client id: ${client.id} connected, user: ${client.userSession}`)
    this.logger.debug(`Number of connected clients: ${sockets.size}`)
  }
  handleDisconnect(client: UserSocket) {
    this.logger.log(`Cliend id:${client.id} disconnected`)
  }
  
  @SubscribeMessage("getMe")
  async getMe(client: UserSocket, data: any):Promise<IUserForMe> {
    console.log("gateway/getMe",data,client.userSession)
    const user : IUser = await this.userRepository.findOneBySession(client.userSession)
    const {passwordHash,session, ...me} = user;
    return me;
  }

  @SubscribeMessage("getMyChats")
  async getMeChats(client: UserSocket, data: any):Promise<IMyChat[]> {
    console.log("getMyChats data, session: ",data,client.userSession)
    
    return this.userRepository.getMyChats(client.userId)
  }

  @SubscribeMessage("subChat")
  async subscribeChat(client: UserSocket, data: ReqSubChat):Promise<ResSubChat>{
    console.log("subscribeChat data:",data)

    const myChat = await this.chatRepository.getMy(data.chatId,client.userId);
    const chat =  { 
      info: myChat,
      messages: this.chats[data.chatId]
    }
    // console.log("CHAT: ",chat)
    return chat;
  }
  
  @SubscribeMessage("message")
  async subscribeChat2(client: UserSocket, data:any){
    console.log("subscribeChat data:",data)
  }
}
