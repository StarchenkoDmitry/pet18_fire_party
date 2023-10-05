export interface UserDB {
    id: number
    pubid: string

    login: string
    email: string
    passwordHash: string

    session: string | null

    name: string | null
    surname: string | null
}



export interface ChatInfo_User{
    pubid:string;
    name:string;
}

export interface ChatInfo{
    pubid: string;
    users: ChatInfo_User[];
    lastMessageID: number | null
}

export interface MeChats{
    mepubid:string;
    chats:ChatInfo[]
}



export interface Message{
    id:number;
    text:string;
    createAt:Date;
    prevMessageID: number;
}
