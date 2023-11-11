import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

//test commite

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository) {
    console.log("constructor ChatService")
  }


  getMyFriends(userId){
    
  }
}
