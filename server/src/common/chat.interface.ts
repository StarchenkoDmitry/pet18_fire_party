import { IUser } from "./user.interface";


export interface IGetChatInfo{
    id:string;
    user:Pick<IUser, "id" | "name" | "imageID">;
    lastMessageID:string;
}

export interface IMessage{
    id:string;
    text:string;
    createAt:Date;
    prevMessageID: string;
}

export interface IChatInfo{
    id: string;
    users: Pick<IUser, "id" | "name" | 'imageID'>[];
    lastMessageID: string | null
}