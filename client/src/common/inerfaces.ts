export interface User {
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


export interface Chat{
    id: number
    pubid: string
    nameChat: string
    lastMessageID: number | null
}