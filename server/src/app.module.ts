import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { ImageModule } from './image/image.module';
import { GatewayModule } from './gateway/gateway.module';
import { LockerModule } from './locker/locker.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaModule,
    LockerModule,
    EventsModule,
    
    UserModule,
    ChatModule,
    ImageModule,

    AuthModule,
    GatewayModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {} 
