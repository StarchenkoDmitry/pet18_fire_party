import { IMessage } from "./chat.interface"
import { IMyChat } from "./me.interface"
import { IUserForMe } from "./user.interface"


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
| { type:typeof CHAT_EVENT_DELETE_CHAT, data:TYPE_RES_CHAT_EVENT_DELETE_CHAT }

export const CHAT_EVENT_ADDMESSAGE = "CHAT_EVENT_ADDMESSAGE"
type TYPE_RES_CHAT_EVENT_ADDMESSAGE = IMessage

export const CHAT_EVENT_REMOVEMESSAGE = "CHAT_EVENT_REMOVEMESSAGE"
type TYPE_RES_CHAT_EVENT_REMOVEMESSAGE = IMessage

export const CHAT_EVENT_DELETE_CHAT = "CHAT_EVENT_DELETE_CHAT"
type TYPE_RES_CHAT_EVENT_DELETE_CHAT = {chatId:string}//chatId




// FRIENDS_ONLINE
export interface ResSubOnChangeOnline{
    users:string[]
}
export interface EventFriendOnline{
    isOnline:boolean
    userId:string
}




export interface IResSubOnMe{
    me:IUserForMe
    chats:IMyChat[]
}

export const ME_EVENT_CHANGE_NAME = "ME_EVENT_CHANGE_NAME"
type TYPE_ME_EVENT_CHANGE_NAME = {name:string}

export const ME_EVENT_CHANGE_SURNAME = "ME_EVENT_CHANGE_SURNAME"
type TYPE_ME_EVENT_CHANGE_SURNAME = {surname:string}


export type MeEvent =
| { type:typeof ME_EVENT_CHANGE_NAME, data:  TYPE_ME_EVENT_CHANGE_NAME}
| { type:typeof ME_EVENT_CHANGE_SURNAME, data: TYPE_ME_EVENT_CHANGE_SURNAME}



//| { type:typeof *, data: *}