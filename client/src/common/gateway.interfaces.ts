import { IMessage } from "./chat.interface"
import { IMyChat } from "./me.interface"


export interface ISubOnChat{
    chatId:string
}

export interface IResSubOnChat{
    info:IMyChat
    messages:IMessage[]
}
