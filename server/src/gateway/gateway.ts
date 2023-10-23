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
import { UserService } from "src/user/user.service";
import { IUser, IUserForMe } from "src/common/user.interface";
import { IChatToUsers } from "src/common/chat.interface";
import { IMyChat } from "src/common/me.interface";


@WebSocketGateway(3020, { 
  cors:{
    origin:true,
    credentials: true,
  },
  pingInterval: 1000,
  pingTimeout: 1500,
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly userService: UserService,){

  }

  private readonly logger = new Logger(ChatGateway.name)
  @WebSocketServer() server: Server

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
    console.log("Client Dimka: ",data,client.userSession)
    const user : IUser = await this.userService.findOneBySession(client.userSession)
    const {passwordHash,session, ...me} = user;
    return me;
  }

  @SubscribeMessage("getMeChats")
  async getMeChats(client: UserSocket, data: any):Promise<IMyChat[]> {
    console.log("getMeChats data, session: ",data,client.userSession)
    const chats: IChatToUsers[] =  await this.userService.getChats(client.userId)
    const meChats: IMyChat[] = chats.map(chat=>{
      if(chat.users.length === 0) 
        throw Error("ChatGateway getMeChats lenght of users is zero.");
      return {
        id: chat.id,
        lastMessageID: chat.lastMessageID,
        user: chat.users[0]
      }
    })
    return meChats;
  } 
}
