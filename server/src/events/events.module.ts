import { Module } from '@nestjs/common';
import { EventsService } from './events.service';


@Module({
  imports:[],
  controllers:[],
  providers:[EventsService],
  exports:[EventsService]
})
export class EventsModule {}
