import { Injectable } from '@nestjs/common';
import { Mutex, MutexKeys } from 'src/utils/Mutex';
import { ChatRepository } from './chat.repository';
import { IMyChat } from 'src/common/me.interface';
import { IMessage, OnChangeChat } from 'src/common/chat.interface';
import { IChatIncludeUsers, ISubscribeOnChat } from './chat.interface';
import { Chat } from '@prisma/client';
import { CustomEmiter } from 'src/utils/CustomEmiter';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository) {
    console.log("constructor ChatService")
  }

  private emiterCreatedNewMessage = new CustomEmiter<OnChangeChat>()

  private mutexChats = new MutexKeys()
  private mutexMessagesChats = new MutexKeys()
  private mutexCreate = new Mutex()

  async create(userId:string,friendId:string):Promise<Chat>{
    await this.mutexCreate.lock()

    const res = await this.chatRepo.create(userId,friendId)

    this.mutexCreate.unlock()
    return res
  }

  // async remove(chatId:string){
  //   throw "func не доделано"
  // }

  async getAll() {
    return await this.chatRepo.getAll()
  }

  async getIncludeUsers(chatId:string):Promise<IChatIncludeUsers>{
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

  async createMessage(chatId:string, userId:string, text:string){
    await this.mutexMessagesChats.lock(chatId)

    const newMessage = await this.chatRepo.createMessage(chatId,userId,text)

    if(newMessage){
      this.emiterCreatedNewMessage.emit(chatId, newMessage)
    }

    this.mutexMessagesChats.unlock(chatId)
    return newMessage
  }

  async removeMessage(chatId:string, messageId:string,userId:string):Promise<boolean>{
    await this.mutexMessagesChats.lock(chatId)

    const removed = await this.chatRepo.removeMessage(chatId,messageId,userId)

    this.mutexMessagesChats.unlock(chatId)
    return removed
  }

  async getAllMessages(chatId:string, userId:string):Promise<IMessage[]>{
    await this.mutexMessagesChats.lock(chatId)

    const messages = await this.chatRepo.getAllMessages(chatId,userId)

    this.mutexMessagesChats.unlock(chatId)
    return messages
  }



  async subOnChat(chatId:string,userId:string,onChange:OnChangeChat):Promise<ISubscribeOnChat>{
    await this.mutexChats.lock(chatId)

    const resMyChat = await this.chatRepo.getMy(chatId,userId)
    const messages = await this.getAllMessages(chatId,userId)

    this.mutexChats.unlock(chatId)
    
    if(!resMyChat) return
    
    const unsub = this.emiterCreatedNewMessage.sub(chatId,onChange);

    return {
      chat:{
        info: resMyChat,
        messages:messages
      },
      unsub: unsub
    }
  }
}
