import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserRepository } from "src/user/user.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthGuard } from "./auth.guard";
import { UserModule } from "src/user/user.module";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule, UserModule], //[forwardRef(() => UserModule)],
    controllers: [AuthController],
    providers: [],
})
export class AuthModule {}
