import { Injectable } from "@nestjs/common";
import { UserSocket } from "../gateway.interface";
import { ClientNameActions } from "src/common/gateway.interfaces";
import { EventFriendOnline } from "src/common/onlineUsers.interface";


interface IOnliner{
  countOnline:number
  isOnline:()=>boolean
  subs:UserSocket[]
}

@Injectable()
export class OnlineUsersService {
  constructor() {
    console.log("constructor OnlineUsersService")
    // setInterval(()=>{
    //   console.log("================")
    //   this.usersOnline.forEach((userData,key)=>{
    //     console.log(`${key}: ${userData.countOnline}/subs: ${userData.subs.length}`)
    //   })
    // },3000)
  }

  usersOnline = new Map<string,IOnliner>()

  private getUser(id:string){
    let onlic = this.usersOnline.get(id)
    if(!onlic){
      onlic = { 
        countOnline: 0, 
        isOnline(){
          return this.countOnline > 0
        },
        subs:[] 
      }
      this.usersOnline.set(id,onlic)
    }
    return onlic
  }

  setUserOnline(user:UserSocket){
    const onlic = this.getUser(user.userId)
    onlic.countOnline++    
    const event: EventFriendOnline = { isOnline:true,userId:user.userId }
    onlic.subs.forEach(sock=>{
        sock.emit(ClientNameActions.onChangeOnlineEvent, event)
    })
  }
  
  setUserOffline(user:UserSocket){
    const onlic = this.getUser(user.userId)

    const beforeOnline = onlic.isOnline()
    onlic.countOnline--
    const currentOnline = onlic.isOnline()

    if(beforeOnline !== currentOnline){
      onlic.subs.forEach(sock=>{
        const event: EventFriendOnline = {
          isOnline: currentOnline,
          userId: user.userId 
        }
        sock.emit(ClientNameActions.onChangeOnlineEvent, event)
      })
    }
    
    if(onlic.subs.length === 0 && !currentOnline){
      this.usersOnline.delete(user.userId)
    }
  }

  subscribeOnOnline(user:UserSocket,friends:string[]){
    friends.forEach(f=>{
      const onlin = this.getUser(f)
      onlin.subs.push(user)
    })
    return this.getUsersOnline(friends)
  }

  unsubOnOnline(user:UserSocket){
    const onDelete = []

    this.usersOnline.forEach((userData,key)=>{
      userData.subs = userData.subs.filter(suber=>suber!== user)
      if(!userData.isOnline() && userData.subs.length === 0){
        onDelete.push(key)
      }
    })

    onDelete.forEach(userok=>{
      this.usersOnline.delete(userok)
    })
  }

  getUsersOnline(friends:string[]):string[]{
    const onlines:string[] = []
    friends.forEach(friend=>{
      const userok = this.usersOnline.get(friend)
      if(userok && userok.isOnline()){
          onlines.push(friend)
      }
    })
    return onlines;
  }
}
