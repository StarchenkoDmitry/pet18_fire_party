import { IMyChat } from "./me.interface"

export interface IChat{
    id: string
    lastMessageID: string | null
}

export interface IMessage{
    id: string
    createAt: Date
    text: string

    userID: string
    chatId: string
    prevMessageID: string | null
}


//Gateway
export interface ISubOnChat{
    chatId:string
}

export interface IResSubOnChat{
    info:IMyChat
    messages:IMessage[]
}




export const CHAT_EVENT_INIT = "CHAT_EVENT_INIT"
export type TYPE_RES_CHAT_EVENT_INIT = IResSubOnChat

export const CHAT_EVENT_ERROR_INIT = "CHAT_EVENT_ERROR_INIT"
export type TYPE_RES_CHAT_EVENT_ERROR_INIT = { chatId:string }

export const CHAT_EVENT_ADDMESSAGE = "CHAT_EVENT_ADDMESSAGE"
export type TYPE_RES_CHAT_EVENT_ADDMESSAGE = IMessage

export const CHAT_EVENT_REMOVEMESSAGE = "CHAT_EVENT_REMOVEMESSAGE"
export type TYPE_RES_CHAT_EVENT_REMOVEMESSAGE = IMessage

export const CHAT_EVENT_DELETE_CHAT = "CHAT_EVENT_DELETE_CHAT"
export type TYPE_RES_CHAT_EVENT_DELETE_CHAT = { chatId:string }


export type ChatEvent =
| { type:typeof CHAT_EVENT_INIT, data:TYPE_RES_CHAT_EVENT_INIT }
| { type:typeof CHAT_EVENT_ERROR_INIT, data:TYPE_RES_CHAT_EVENT_ERROR_INIT }

| { type:typeof CHAT_EVENT_ADDMESSAGE, data:TYPE_RES_CHAT_EVENT_ADDMESSAGE }
| { type:typeof CHAT_EVENT_REMOVEMESSAGE, data:TYPE_RES_CHAT_EVENT_REMOVEMESSAGE }
| { type:typeof CHAT_EVENT_DELETE_CHAT, data:TYPE_RES_CHAT_EVENT_DELETE_CHAT }
