export interface IMessage {
    id: string;
    createAt: Date;
    text: string;

    userID: string;
    chatId: string;
    prevMessageID: string | null;
}
