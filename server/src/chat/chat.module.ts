import { Module } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";
import { ChatController } from "./chat.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { ChatService } from "./chat.service";
import { LockerModule } from "src/locker/locker.module";
import { EventsModule } from "src/events/events.module";

@Module({
    imports: [PrismaModule, LockerModule, EventsModule, UserModule],
    controllers: [ChatController],
    providers: [ChatRepository, ChatService],
    exports: [ChatRepository, ChatService],
})
export class ChatModule {}
