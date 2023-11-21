import { Module } from '@nestjs/common';

import { Gateway } from './gateway';
import { UserModule } from 'src/user/user.module';
import { ChatModule } from 'src/chat/chat.module';
import { UsersOnlineService } from './services/usersOnline.service';
import { MeService } from './services/me.service';
import { LockerModule } from 'src/locker/locker.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    LockerModule,
    EventsModule,
    UserModule,
    ChatModule,
  ],
  providers: [
    Gateway,
    MeService,
    UsersOnlineService
  ],
  exports: [
    Gateway,
    MeService,
    UsersOnlineService
  ],
})
export class GatewayModule {}
