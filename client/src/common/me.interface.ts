import { IUser } from "./user.interface";

export type IMe = Pick<IUser, "id" | "name" | "surname" | "imageID">

export interface IMyChat{
    id:string
    lastMessageID:string | null
    user:Pick<IUser, "id" | "name" | "imageID">
}
