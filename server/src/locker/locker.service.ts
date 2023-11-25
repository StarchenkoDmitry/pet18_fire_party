import { Injectable } from '@nestjs/common';
import { Mutex, MutexKeys } from 'src/utils/Mutex';


@Injectable()
export class LockerService {
  constructor() {
    console.log("constructor LockerService")
  }

  public readonly mutexChats = new MutexKeys()
  // public readonly mutexMessagesChats = new MutexKeys()
  public readonly mutexCreateChat = new Mutex()
  public readonly mutexRemoveChat = new Mutex()

  public readonly mutexUsers = new MutexKeys()
}
