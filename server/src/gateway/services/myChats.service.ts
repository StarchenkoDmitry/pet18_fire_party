import { Injectable } from "@nestjs/common";
import { UserSocket } from "../gateway.interface";
import { LockerService } from "src/locker/locker.service";
import { UserRepository } from "src/user/user.repository";
import { 
  EventMeChats, 
  MECHATS_EVENT_INIT, 
  MECHATS_EVENT_CHANGE_NAME, 
  MECHATS_EVENT_CHANGE_SURNAME } from "src/common/me.interface";
import { EventsService } from "src/events/events.service";
import { USER_EVENT_CHANGE_NAME, USER_EVENT_CHANGE_SURNAME } from "src/common/user.interface";
import { ClientNameActions } from "src/common/gateway.interfaces";
import { IChatWithUser } from "src/common/chat.interface";


@Injectable()
export class MyChatsService {
  constructor(
    private readonly locker: LockerService,
    private readonly events: EventsService,
    private readonly userRepository: UserRepository,
  ) {
    console.log("constructor MyChatsService")
  }
  
  async subscribe(client:UserSocket){
    if(client.subscribesOnUsersFromChat){
      client.subscribesOnUsersFromChat.forEach(unsub=>unsub())
      client.subscribesOnUsersFromChat = undefined
    }

    await this.locker.mutexCreateChat.lock()
    await this.locker.mutexRemoveChat.lock()

    const chats1: IChatWithUser[] = await this.userRepository.getMyChats(client.userId)

    if(!chats1){
      await this.locker.mutexCreateChat.unlock()
      await this.locker.mutexRemoveChat.unlock()
      return
    }

    for(let p = 0;p < chats1.length;p++){
      await this.locker.mutexChats.lock(chats1[p].id)
    }
    
    const chats2: IChatWithUser[] = await this.userRepository.getMyChats(client.userId)

    if(chats2){
      const event: EventMeChats = {
        type: MECHATS_EVENT_INIT,
        data:{ chats:chats2 }
      }
      client.emit(ClientNameActions.onChatsEvent,event)

      const subList: (()=>void)[] = []
      for(let p =0;p< chats2.length;p++){
        const userIdFromChat  =chats2[p].user.id
        const subOnUserFromChat = this.events.eventUsers.sub(userIdFromChat,(event)=>{
          switch(event.type){
            case USER_EVENT_CHANGE_NAME:{
              const eventUser: EventMeChats = {
                type: MECHATS_EVENT_CHANGE_NAME,
                data: {
                  userId: userIdFromChat,
                  name: event.data.name
                }
              }
              client.emit(ClientNameActions.onChatsEvent,eventUser)
              break
            }
            //Это event не нужен(пока что)
            // case USER_EVENT_CHANGE_SURNAME:{
            //   const eventUser: EventMeChats = {
            //     type: MECHATS_EVENT_CHANGE_SURNAME,
            //     data: {
            //       userId: userIdFromChat,
            //       surname: event.data.surname
            //     }
            //   }
            //   client.emit(TypeEventMe.eventsOnChats,eventUser)
            //   break
            // }
          }
        })
        subList.push(subOnUserFromChat)
      }
      client.subscribesOnUsersFromChat = subList
    }

    for(let p = 0;p < chats1.length;p++){
      await this.locker.mutexChats.unlock(chats1[p].id)
    }

    await this.locker.mutexCreateChat.unlock()
    await this.locker.mutexRemoveChat.unlock()
  }
}
