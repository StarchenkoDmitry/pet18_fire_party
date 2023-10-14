import { IUserForChatInfo } from "./chat.interface";

export interface IMe{
    id:string;
    
    name:string;
    surname:string;

    imageID:string | null;
} 


export interface IChatView{
    id: string;
    user: IUserForChatInfo;
    lastMessageID: string | null
}


export interface IMeChats{
    meid:string;
    chats:IChatView[]
}
