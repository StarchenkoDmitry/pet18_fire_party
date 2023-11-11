import { IUser } from "src/common/user.interface";

export enum LoginStatus{
    userNotFound,
    passwordWrong,
    ok,
}
export interface LoginResult{
    status:LoginStatus;
    session?:string;
}

// export interface IMyChats{
//     id:string
//     lastMessageID:string | null
//     users:Pick<IUser, "id" | "name" | "imageID">[]
// }

