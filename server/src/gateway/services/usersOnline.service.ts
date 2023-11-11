import { Injectable } from "@nestjs/common";
import { UserSocket } from "../gateway.interface";
import { EventFriendOnline } from "src/common/gateway.interfaces";


interface IOnliner{
    user:UserSocket | null
    isOnline:boolean
    subs:UserSocket[]
}

@Injectable()
export class UsersOnlineService {
  constructor() {
    console.log("constructor UsersOnlineService")
  }

  usersOnline = new Map<string,IOnliner>()

//   private getUser(id:string){}

  setUserOnline(user:UserSocket){
    let onlic = this.usersOnline.get(user.userId)
    if(!onlic){
        onlic = { user, isOnline:false, subs:[] }
        this.usersOnline.set(user.userId,onlic)
    }
    onlic.isOnline = true

    onlic.subs.forEach(sock=>{
        const event: EventFriendOnline = { isOnline:true,userId:user.userId }
        sock.emit("changeOnline", event)
    })
  }
  
  setUserOffline(user:UserSocket){
    let onlic = this.usersOnline.get(user.userId)
    if(!onlic)return
    onlic.isOnline = false

    onlic.subs.forEach(sock=>{
        const event: EventFriendOnline = { isOnline:false,userId:user.userId }
        sock.emit("changeOnline", event)
    })
    if(onlic.subs.length === 0){
        this.usersOnline.delete(user.userId)
    }
  }

  subOnOnline(user:UserSocket,friends:string[]){
    friends.forEach(f=>{
        let onlic = this.usersOnline.get(f)
        if(!onlic){
            onlic = { user:null, isOnline:true, subs:[] }
            this.usersOnline.set(user.userId,onlic)
        }
        onlic.subs.push(user)
    })

    return this.getUsersOnline(friends)
  }

  unsubOnOnline(user:UserSocket){
    const onDelete = []

    this.usersOnline.forEach((userData,key)=>{
        userData.subs = userData.subs.filter(suber=>suber!== user)
        if(!userData.isOnline && userData.subs.length === 0){
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
        if(userok && userok.isOnline){
            onlines.push(friend);
        }
    })
    return onlines;
  }
}
