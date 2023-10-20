import { IoAdapter } from '@nestjs/platform-socket.io';

import { UserSocket } from './gateway.interface';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    // console.log("WebsocketAdapter option: ", options)    
    const server = super.createIOServer(port, options)

    server.use(async (socket: UserSocket, next) => {
      socket.user = {superpuper:"user"};

      next();
    });
    
    return server;
  }
}
