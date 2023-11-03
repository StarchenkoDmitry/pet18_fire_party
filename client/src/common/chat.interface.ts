export interface IChat{
    id: string
    lastMessageID: string | null
}

export interface IMessage{
    id: string
    createAt: Date
    text: string
    
    userId: string
    chatId: string
    prevMessageID: string | null
}


export type OnChangeChat = (newMessage:IMessage)=>void
