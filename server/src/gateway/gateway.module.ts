import { Module } from "@nestjs/common";

import { Gateway } from "./gateway";
import { UserModule } from "src/user/user.module";
import { ChatModule } from "src/chat/chat.module";
import { OnlineUsersService } from "./services/onlineUsers.service";
import { MeService } from "./services/me.service";
import { LockerModule } from "src/locker/locker.module";
import { EventsModule } from "src/events/events.module";
import { MyChatsService } from "./services/myChats.service";

@Module({
    imports: [LockerModule, EventsModule, UserModule, ChatModule],
    providers: [Gateway, MeService, OnlineUsersService, MyChatsService],
    exports: [Gateway, MeService, OnlineUsersService, MyChatsService],
})
export class GatewayModule {}
