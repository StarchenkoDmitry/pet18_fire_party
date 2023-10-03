export interface UserDB {
    // login:string;
    // passwordHash:string;
    // email:string;

    // token?:string;

    // name?:string;
    // surname?:string;

    id: number
    pubid: string

    login: string
    email: string
    passwordHash: string

    session: string | null

    name: string | null
    surname: string | null
}


// export interface ChatDB{
//     id: number
//     pubid: string
//     lastMessageID: number | null
// }


// export interface Chat{
//     pubid: string
//     lastMessageID: number | null
// }


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
