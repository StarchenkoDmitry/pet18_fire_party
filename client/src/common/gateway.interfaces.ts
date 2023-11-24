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
