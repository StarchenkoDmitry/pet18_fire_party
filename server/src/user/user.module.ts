import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { ImageModule } from "src/image/image.module";
import { UserService } from "./user.service";
import { LockerModule } from "src/locker/locker.module";
import { EventsModule } from "src/events/events.module";

@Module({
    imports: [PrismaModule, LockerModule, EventsModule, ImageModule],
    controllers: [UserController],
    providers: [UserRepository, UserService],
    exports: [UserRepository, UserService],
})
export class UserModule {}
