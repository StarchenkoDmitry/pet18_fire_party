import { Module } from '@nestjs/common';
import { LockerService } from './locker.service';


@Module({
  imports:[],
  controllers:[],
  providers:[LockerService],
  exports:[LockerService]
})
export class LockerModule {}
