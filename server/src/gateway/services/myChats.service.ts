import { Injectable } from "@nestjs/common";
import { UserSocket } from "../gateway.interface";
import { LockerService } from "src/locker/locker.service";
import { UserRepository } from "src/user/user.repository";
import { User } from "@prisma/client";
import { TypeEventMe, EventMe, ME_EVENT_ERROR_INIT, ME_EVENT_INIT } from "src/common/me.interface";

@Injectable()
export class MyChatsService {
  constructor(
    private readonly locker: LockerService,
    private readonly userRepository: UserRepository,
  ) {
    console.log("constructor MyChatsService")
  }
  
  async subscribe(client:UserSocket){

    // await this.locker.mutexCreateChat.lock()
    // await this.locker.mutexRemoveChat.lock()

    // const userData: User = await this.userRepository.getMyChats(client.userId)

  } 
}
