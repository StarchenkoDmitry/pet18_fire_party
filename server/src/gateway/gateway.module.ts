import { Module } from '@nestjs/common';

import { ChatGateway } from './gateway';

@Module({
  imports: [],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export class GatewayModule {}
