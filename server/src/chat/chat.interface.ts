import { Chat, User } from "@prisma/client";
import { ChatEvent, IResSubOnChat } from "src/common/gateway.interfaces";

export interface IChatIncludeUsers extends Chat {
    users:User[]
}

export interface ISubscribeOnChat{
    chat:IResSubOnChat
    unsub:()=>void
}

export type OnChangeChat = (event:ChatEvent)=>void
