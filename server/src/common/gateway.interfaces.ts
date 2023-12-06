export const ServerNameActions = {
    subscribeOnMe:"ServerNameActions.subscribeOnMe",
    subscribeOnChats:"ServerNameActions.subscribeOnChats",

    createMessage:"ServerNameActions.createMessage",
    removeMessage:"ServerNameActions.removeMessage",

    subscribeOnChat:"ServerNameActions.subscribeOnChat",
    subscribeOnChangeOnline:"ServerNameActions.subscribeOnChangeOnline",


    setName:"ServerNameActions.setName",
    setSurname:"ServerNameActions.setSurname",

    searchForUsers:"ServerNameActions.searchForUsers",

    deleteChat:"ServerNameActions.deleteChat",

} as const
export type TypeServerNameActions = typeof ServerNameActions[keyof typeof ServerNameActions]

export const ClientNameActions = {
    onMeEvent:"ClientNameActions.onMeEvent",
    onChatsEvent:"ClientNameActions.onChatsEvent",
    onChangeOnlineEvent:"ClientNameActions.onChangeOnlineEvent",
    onChatEvent:"ClientNameActions.onChatEvent",
} as const
export type TypeClientNameActions = typeof ClientNameActions[keyof typeof ClientNameActions]


export interface ISubscribeOnChat{
    chatId:string
}

export interface ICreateMessage{
    chatId:string
    text:string
}

export interface IRemoveMessage{
    chatId:string
    messageId:string
}

export interface IDeleteChat{
    chatId:string
}

export interface ISetName{
    name:string
}

export interface ISetSurname{
    surname:string
}

export interface ISearchForUsers{
    name:string
}
