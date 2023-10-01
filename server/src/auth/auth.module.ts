import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { MyAuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [],//[forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [UserService,AuthService,PrismaService],
  // exports: [AuthService],
})
export class AuthModule {}