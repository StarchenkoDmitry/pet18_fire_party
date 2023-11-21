import { IMessage } from "./chat.interface"
import { IMyChat } from "./me.interface"
import { IUserForMe } from "./user.interface"


// FRIENDS_ONLINE
export interface ResSubOnChangeOnline{
    users:string[]
}
export interface EventFriendOnline{
    isOnline:boolean
    userId:string
}
