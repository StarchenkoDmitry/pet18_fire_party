import { Module } from '@nestjs/common';

import { Gateway } from './gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [Gateway],
  exports: [Gateway],
})
export class GatewayModule {}
