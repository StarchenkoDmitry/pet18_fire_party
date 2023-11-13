import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MutexKeys } from 'src/utils/Mutex';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository) {
    console.log("constructor ChatService")
  }


  private mutexUsers = new MutexKeys()

  async setName(userId:string,name:string | null){
    this.mutexUsers.lock(userId)
    const res = await this.userRepo.setName(userId,name)
    this.mutexUsers.unlock(userId)
    return res;
  }

  async setSurname(userId:string,surname:string | null){
    this.mutexUsers.lock(userId)
    const res = await this.userRepo.setSurname(userId,surname)
    this.mutexUsers.unlock(userId)
    return res;
  }
}
