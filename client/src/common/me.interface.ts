import { IUser } from "./user.interface";

export interface IMyChat{
    id:string
    lastMessageID:string | null
    user:Pick<IUser, "id" | "name" | "imageID">
}
