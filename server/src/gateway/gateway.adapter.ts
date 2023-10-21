import { IoAdapter } from '@nestjs/platform-socket.io';

import { UserSocket } from './gateway.interface';

import * as cookieParser from 'cookie-parser';
import * as cookie from 'cookie';

export class WebsocketAdapter extends IoAdapter {

    createIOServer(port: number, options?: any) {
        const server = super.createIOServer(port, options)

        server.use(async (socket: UserSocket, next) => {
            socket.user = {superpuper:"user"};
            try {
                const cookies = socket.handshake.headers.cookie;

                const cok =  cookie.parse(cookies);
                console.log('cookieParsed: ',cok);

                const signedCookie = cookieParser.signedCookie(cok.session,"My_secret_1234");
                console.log('signedCookie: ',signedCookie);

            } catch (error) {
                
            }
            next();
        });
        return server;
    }
}
