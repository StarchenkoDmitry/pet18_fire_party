import { Injectable } from '@nestjs/common';
import { Mutex, MutexKeys } from 'src/utils/Mutex';
import { ChatRepository } from './chat.repository';
import { IMyChat } from 'src/common/me.interface';
import { IMessage } from 'src/common/chat.interface';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository) {
    console.log("constructor ChatService")
  }

  private mutexChats = new MutexKeys()
  private mutexMessagesChats = new MutexKeys()
  private mutexCreate = new Mutex()

  async create(userId:string,friendId:string){
    await this.mutexCreate.lock()

    const res = await this.chatRepo.create(userId,friendId)

    this.mutexCreate.unlock()
  }

  async remove(chatId:string){
    throw "func не доделано"
  }
  async getAll() {
    return await this.chatRepo.getAll()
  }

  async getIncludeUsers(chatId:string){
    await this.mutexChats.lock(chatId)

    const res = await this.chatRepo.getIncludeUsers(chatId)

    this.mutexChats.unlock(chatId)
    return res
  }

  async getMy(chatId:string,userId:string):Promise<IMyChat>{
    await this.mutexChats.lock(chatId)

    const res = await this.chatRepo.getMy(chatId,userId)
    
    this.mutexChats.unlock(chatId)
    return res
  }

  async createMessage(chatid:string, userid:string, message:string){
    await this.mutexMessagesChats.lock(chatid)

    const res = await this.chatRepo.createMessage(chatid,userid,message)

    this.mutexMessagesChats.unlock(chatid)
    return res
  }

  async getAllMessages(chatId:string, userId:string):Promise<IMessage[]>{
    await this.mutexMessagesChats.lock(chatId)

    const messages = await this.chatRepo.getAllMessages(chatId,userId)

    this.mutexMessagesChats.unlock(chatId)
    return messages
  }

  async removeMessage(chatId:string, messageId:string,userId:string):Promise<boolean>{
    await this.mutexMessagesChats.lock(chatId)

    const removed = await this.chatRepo.removeMessage(chatId,messageId,userId)

    this.mutexMessagesChats.unlock(chatId)
    return removed
  }
}
