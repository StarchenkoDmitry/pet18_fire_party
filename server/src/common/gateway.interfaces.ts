import { IMyChat } from "./me.interface"

export interface ReqSubChat{
    chatId:string
}

export interface ResSubChat{
    info:IMyChat
    messages:string[]
}