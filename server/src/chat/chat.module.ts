import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[
    PrismaModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
  exports:[ChatService]
})
export class ChatModule {}
