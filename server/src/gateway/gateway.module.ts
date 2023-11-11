import { Module } from '@nestjs/common';

import { Gateway } from './gateway';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from 'src/chat/chat.module';
import { UsersOnlineService } from './services/usersOnline.service';

@Module({
  imports: [
    UserModule,
    ChatModule,
  ],
  providers: [Gateway,UsersOnlineService],
  exports: [Gateway,UsersOnlineService],
})
export class GatewayModule {}
