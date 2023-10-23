import { IUser } from "./user.interface"

export interface IChat{
    id:string
    lastMessageID:string | null
}

// export interface IChatToUsers{
//     id:string
//     lastMessageID:string | null
//     users:Pick<IUser, "id" | "name" | "imageID">[]
// }

export interface IMessage{
    id:string;
    text:string;
    createAt:Date;
    prevMessageID: string;
}
