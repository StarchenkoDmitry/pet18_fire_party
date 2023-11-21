import { Chat, User } from "@prisma/client";
import { IResSubOnChat } from "src/common/chat.interface";

export interface IChatIncludeUsers extends Chat {
    users:User[]
}

export interface ISubscribeOnChat{
    chat:IResSubOnChat
    unsub:()=>void
}
