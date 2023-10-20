import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [AuthModule,UserModule, ChatModule, PrismaModule, ImageModule,GatewayModule],
  controllers: [],
  providers: [],  
  exports:[]
})
export class AppModule {} 
