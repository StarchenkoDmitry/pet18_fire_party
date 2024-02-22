import { IoAdapter } from "@nestjs/platform-socket.io";
import { INestApplicationContext, forwardRef, Inject } from "@nestjs/common";
import { UserRepository } from "src/user/user.repository";

import { UserSocket } from "./gateway.interface";

import * as cookieParser from "cookie-parser";
import * as cookie from "cookie";

export class WebsocketAdapter extends IoAdapter {
    private readonly userRepository: UserRepository;

    constructor(private app: INestApplicationContext) {
        super(app);
        this.userRepository = app.get(UserRepository);
    }

    createIOServer(port: number, options?: any) {
        const server = super.createIOServer(port, options);

        server.use(async (socket: UserSocket, next) => {
            try {
                const cookies = socket.handshake.headers.cookie;
                if (!cookies) {
                    console.log("error cookies is null");
                    return;
                }

                const parsedCookies = cookie.parse(cookies);
                const sessionCookie = parsedCookies.session;
                //todo:hide a cookies secret
                const session = cookieParser.signedCookie(sessionCookie, "My_secret_1234");
                if (session) {
                    socket.userSession = session;

                    const user = await this.userRepository.findOneBySession(session);
                    // console.log("WebsocketAdapter user: ",user)
                    if (user) {
                        socket.user = user;
                        socket.userId = user.id;
                        next();
                    }
                }
                //console.log("socket UserID:",socket.userId);
            } catch (error) {
                console.log("WebsocketAdapter error: ", error);
            }
        });
        return server;
    }
}
