import { IUser } from "./user.interface";


export type IMe = Pick<IUser, "id" | "name" | "surname" | "imageID">

export interface IChatView{
    id: string;
    user: Pick<IUser, "id" | "name">;
    lastMessageID: string | null
}

export interface IMeChats{
    meid:string;
    chats:IChatView[]
}
