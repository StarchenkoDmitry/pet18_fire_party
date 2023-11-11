import { IMessage } from "./chat.interface"
import { IMyChat } from "./me.interface"


export interface ISubOnChat{
    chatId:string
}

export interface IResSubOnChat{
    info:IMyChat
    messages:IMessage[]
}


export type ChatEvent =
    | { type:typeof CHAT_EVENT_ADDMESSAGE, data:TYPE_RES_CHAT_EVENT_ADDMESSAGE }
    | { type:typeof CHAT_EVENT_REMOVEMESSAGE, data:TYPE_RES_CHAT_EVENT_REMOVEMESSAGE }

export const CHAT_EVENT_ADDMESSAGE = "CHAT_EVENT_ADDMESSAGE"
type TYPE_RES_CHAT_EVENT_ADDMESSAGE = IMessage

export const CHAT_EVENT_REMOVEMESSAGE = "CHAT_EVENT_REMOVEMESSAGE"
type TYPE_RES_CHAT_EVENT_REMOVEMESSAGE = IMessage



// FRIENDS_ONLINE
export interface ResSubOnChangeOnline{
    users:string[]
}
export interface EventFriendOnline{
    isOnline:boolean
    userId:string
}
