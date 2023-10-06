export interface UserDB {
    id: string

    login: string
    email: string
    passwordHash: string

    session: string | null

    name: string | null
    surname: string | null
}



export interface ChatInfo_User{
    id:string;
    name:string;
}

export interface ChatInfo{
    id: string;
    users: ChatInfo_User[];
    lastMessageID: string | null
}

export interface MeChats{
    meid:string;
    chats:ChatInfo[]
}



export interface Message{
    id:string;
    text:string;
    createAt:Date;
    prevMessageID: string;
}
