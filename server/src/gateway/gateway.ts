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


@WebSocketGateway(3020, { 
  cors:{
    origin:true,
    credentials: true,
  },
  pingInterval: 1000,
  pingTimeout: 1500,
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatGateway.name);
  @WebSocketServer() server: Server;

  afterInit() {
    this.logger.log("Initialized");
  }

  handleConnection(client: UserSocket, ...args: any[]) {
    const { sockets } = this.server.sockets;
    this.logger.log(`Client id: ${client.id} connected, user: ${client.user}`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
    // console.log("Client connected: ",client.user,client.id);    
  }

  handleDisconnect(client: UserSocket) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }



  @SubscribeMessage("test1")
  handleMessageDimka(client: UserSocket, data: any) {
    console.log("test1: ",data)
    return "Good test1"
  }

  @SubscribeMessage("getMeState")
  messageGetMeState(client: UserSocket, data: any) {
    console.log("Client Dimka: ",data)
    return "Nice"
  } 
}