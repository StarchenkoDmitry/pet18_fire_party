export interface IGetChatInfo_IUser{
    id:string;
    name:string;
    imageID:string
}

export interface IGetChatInfo{
    id:string;
    user:IGetChatInfo_IUser;
    lastMessageID:string;
}
