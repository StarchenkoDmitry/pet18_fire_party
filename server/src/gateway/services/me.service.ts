import { Injectable } from "@nestjs/common";
import { UserSocket } from "../gateway.interface";
import { LockerService } from "src/locker/locker.service";
import { UserRepository } from "src/user/user.repository";
import { User } from "@prisma/client";
import { EventMe, ME_EVENT_ERROR_INIT, ME_EVENT_INIT, ME_EVENT_CHANGE_NAME, ME_EVENT_CHANGE_SURNAME } from "src/common/me.interface";
import { EventsService } from "src/events/events.service";
import { USER_EVENT_CHANGE_NAME, USER_EVENT_CHANGE_SURNAME } from "src/common/user.interface";
import { ClientNameEvents } from "src/common/gateway.interfaces";


@Injectable()
export class MeService {
  constructor(
    private readonly locker: LockerService,
    private readonly events: EventsService,
    private readonly userRepository: UserRepository,
  ) {
    console.log("constructor MeService")
  }
  
  async subscribe(client:UserSocket){
    if(client.cancelSubOnMe){
        client.cancelSubOnMe()
        client.cancelSubOnMe = undefined
    }

    await this.locker.mutexUsers.lock(client.userId)

    const userData: User = await this.userRepository.get(client.userId)
    if(!userData){
        const event: EventMe = {
            type: ME_EVENT_ERROR_INIT,
            data:undefined
        } 
        client.emit(ClientNameEvents.eventsOnMe,event)
        return
    }

    const { id, name, surname, imageID, login, email } = userData

    const event: EventMe = {
        type: ME_EVENT_INIT,
        data:{
            me:{id, name, surname, imageID, login, email}
        }
    }
    client.emit(ClientNameEvents.eventsOnMe,event)

    const subCancel = this.events.eventUsers.sub(client.userId,(event)=>{
        switch(event.type){
            case USER_EVENT_CHANGE_NAME:{
                client.emit(ClientNameEvents.eventsOnMe,{
                    type: ME_EVENT_CHANGE_NAME,
                    data:event.data,
                })
                break
            }
            case USER_EVENT_CHANGE_SURNAME:{
                client.emit(ClientNameEvents.eventsOnMe,{
                    type: ME_EVENT_CHANGE_SURNAME,
                    data:event.data,
                })
                break
            }
        }
    })
    client.cancelSubOnMe = subCancel
    
    this.locker.mutexUsers.unlock(client.userId)
  }
}
