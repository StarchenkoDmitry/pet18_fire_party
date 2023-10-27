import { Module } from '@nestjs/common';

import { Gateway } from './gateway';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    UserModule,
    ChatModule,
  ],
  providers: [Gateway],
  exports: [Gateway],
})
export class GatewayModule {}
