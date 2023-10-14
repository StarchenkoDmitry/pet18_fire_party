import { IUser } from "./user.interface";

export interface IGetChatInfo_IUser{
    id:string;
    name:string;
    imageID:string
}

export interface IGetChatInfo{
    id:string;
    user:IGetChatInfo_IUser;
    lastMessageID:string;
}

export interface IMessage{
    id:string;
    text:string;
    createAt:Date;
    prevMessageID: string;
}


export type IUserForChatInfo = Pick<IUser, "id" | "name">

export interface IChatInfo{
    id: string;
    users: IUserForChatInfo[];
    lastMessageID: string | null
}