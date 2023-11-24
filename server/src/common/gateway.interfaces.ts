import { IMessage } from "./chat.interface"
import { IMyChat } from "./me.interface"
import { IUserForMe } from "./user.interface"


// FRIENDS_ONLINE
export interface ResSubOnChangeOnline{
    users:string[]
}
export interface EventFriendOnline{
    isOnline:boolean
    userId:string
}


export const ServerNameEvents = {
    subscribeOnMe:"ServerNameEvents.subscribeOnMe",
    subscribeOnChats:"ServerNameEvents.subscribeOnChats",

    createMessage:"ServerNameEvents.createMessage",
    removeMessage:"ServerNameEvents.removeMessage",
    
    subOnChat:"ServerNameEvents.subOnChat",
    subOnChangeOnline:"ServerNameEvents.subOnChangeOnline",

    
    changeName:"ServerNameEvents.changeName",
    changeSurname:"ServerNameEvents.changeSurname",

    searchUsers:"ServerNameEvents.searchUsers",
    
    deleteChat:"ServerNameEvents.deleteChat",
    
} as const
export type TypeServerNameEvents = typeof ServerNameEvents[keyof typeof ServerNameEvents]

export const ClientNameEvents = {
    eventsOnMe:"ClientNameEvents.eventsOnMe",
    eventsOnChats:"ClientNameEvents.eventsOnChats",
    changeOnline:"ClientNameEvents.changeOnline",
    onChatEvent:"ClientNameEvents.onChatEvent",
} as const
export type TypeClientNameEvents = typeof ClientNameEvents[keyof typeof ClientNameEvents]
