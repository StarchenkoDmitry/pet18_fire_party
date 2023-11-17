import { Injectable } from '@nestjs/common';
import { Mutex, MutexKeys } from 'src/utils/Mutex';
import { ChatRepository } from './chat.repository';
import { IMyChat } from 'src/common/me.interface';
import { IMessage } from 'src/common/chat.interface';
import { IChatIncludeUsers, OnChangeChat } from './chat.interface';
import { Chat, Message } from '@prisma/client';
import { CustomEmiter } from 'src/utils/CustomEmiter';
import { CHAT_EVENT_ADDMESSAGE, CHAT_EVENT_DELETE_CHAT, CHAT_EVENT_REMOVEMESSAGE, IResSubOnChat } from 'src/common/gateway.interfaces';
import { UserSocket } from 'src/gateway/gateway.interface';


@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository) {
    console.log("constructor ChatService")
  }

  private eventChats = new CustomEmiter<OnChangeChat>()

  private mutexChats = new MutexKeys()
  private mutexMessagesChats = new MutexKeys()
  private mutexCreate = new Mutex()
  private mutexRemove = new Mutex()

  async create(userId:string,friendId:string):Promise<Chat>{
    await this.mutexCreate.lock()

    const res = await this.chatRepo.create(userId,friendId)

    this.mutexCreate.unlock()
    return res
  }
  async remove(userId:string,chatId:string) {
    this.mutexRemove.lock()

    const resDelete = await this.chatRepo.remove(userId,chatId)

    this.mutexRemove.unlock()
    this.eventChats.emit(chatId,{
      type:CHAT_EVENT_DELETE_CHAT,
      data:{chatId}
    })
    return resDelete
  }

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
      this.eventChats.emit(chatId, {
        type:CHAT_EVENT_ADDMESSAGE,
        data:newMessage
      })
    }

    this.mutexMessagesChats.unlock(chatId)
    return newMessage
  }

  async removeMessage(chatId:string, messageId:string,userId:string):Promise<Message>{
    // if(!chatId || !messageId || !userId) throw new Error("params is not corect")
    await this.mutexMessagesChats.lock(chatId)

    const removedMessage = await this.chatRepo.removeMessage(chatId,messageId,userId)

    if(removedMessage){
      this.eventChats.emit(chatId, {
        type:CHAT_EVENT_REMOVEMESSAGE,
        data:removedMessage
      })
    }

    this.mutexMessagesChats.unlock(chatId)
    return removedMessage
  }

  async getAllMessages(chatId:string, userId:string):Promise<IMessage[]>{
    await this.mutexMessagesChats.lock(chatId)

    const messages = await this.chatRepo.getAllMessages(chatId,userId)

    this.mutexMessagesChats.unlock(chatId)
    return messages
  }

  async subscribeOnChat(chatId:string, userId:string, client:UserSocket):Promise<IResSubOnChat>{    
    if(client.subChat){
      client.subChat()
      client.subChat = undefined
    }

    await this.mutexChats.lock(chatId)

    const resMyChat = await this.chatRepo.getMy(chatId,userId)
    const messages = await this.getAllMessages(chatId,userId)

    this.mutexChats.unlock(chatId)
    
    if(!resMyChat) return
    
    client.subChat = this.eventChats.sub(chatId, (event)=>{
      // console.log("onChatEvent event:", event)
      client.emit("onChatEvent", event)
    })
    
    return {
        info: resMyChat,
        messages:messages
    }
  }
}
