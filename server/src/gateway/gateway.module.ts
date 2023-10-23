import { Module } from '@nestjs/common';

import { ChatGateway } from './gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class GatewayModule {}
