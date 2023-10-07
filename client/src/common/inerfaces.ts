export interface IUser {
    id: string

    login: string
    email: string
    passwordHash: string

    session: string | null

    name: string | null
    surname: string | null
}


export type IUserForChatInfo = Pick<IUser, "id" | "name">

export interface IChatInfo{
    id: string;
    users: IUserForChatInfo[];
    lastMessageID: string | null
}

export interface IChatInfoKorotko{
    id: string;
    user: IUserForChatInfo;
    lastMessageID: string | null
}


// export interface IMeChats{
//     meid:string;
//     chats:IChatInfo[]
// }

export interface IMeChats{
    meid:string;
    chats:IChatInfoKorotko[]
}


export interface IMessage{
    id:string;
    text:string;
    createAt:Date;
    prevMessageID: string;
}
