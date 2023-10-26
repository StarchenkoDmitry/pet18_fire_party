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

import { UserService } from "src/user/user.service";

@WebSocketGateway(3020, { 
  cors:{
    origin:true,
    credentials: true,
  },
  pingInterval: 1000,
  pingTimeout: 1500,
})
export class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly userService: UserService,) {}

  private readonly logger = new Logger(Gateway.name)
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
    console.log("gateway/getMe",data,client.userSession)
    const user : IUser = await this.userService.findOneBySession(client.userSession)
    const {passwordHash,session, ...me} = user;
    return me;
  }

  @SubscribeMessage("getMyChats")
  async getMeChats(client: UserSocket, data: any):Promise<IMyChat[]> {
    console.log("getMyChats data, session: ",data,client.userSession)
    
    return this.userService.getMyChats(client.userId)
  }

  @SubscribeMessage("subscribeChat")
  async subscribeChat(client: UserSocket, data: any){
    console.log("subscribeChat data:",data)
  }
  
  @SubscribeMessage("message")
  async subscribeChat2(client: UserSocket, data: any){
    console.log("subscribeChat data:",data)
  }

}
