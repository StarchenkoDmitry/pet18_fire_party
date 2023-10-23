export interface IChat{
    id:string
    lastMessageID:string | null
}

export interface IMessage{
    id:string;
    text:string;
    createAt:Date;
    prevMessageID: string | null;
}
