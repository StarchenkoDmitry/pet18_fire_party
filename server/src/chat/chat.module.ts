import { Module } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatController } from './chat.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[
    PrismaModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatRepository],
  exports:[ChatRepository]
})
export class ChatModule {}
