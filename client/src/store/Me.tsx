import { create } from "zustand";
import { Socket } from "socket.io-client";
import { IUserForMe } from "@/common/user.interface";
import { EventMe, 
    EventMeChats, 
    IMyChat, 
    MECHATS_EVENT_CHANGE_NAME, 
    MECHATS_EVENT_INIT, 
    ME_EVENT_CHANGE_NAME, 
    ME_EVENT_CHANGE_SURNAME, 
    ME_EVENT_INIT 
} from "@/common/me.interface";
import { IUseConnect } from "./Connent";
import { ClientNameEvents, ServerNameEvents } from "@/common/gateway.interfaces";


export interface IMeStore extends IUseConnect{
    _socket: Socket | null

    me?: IUserForMe
    chats?: IMyChat[]

    changeName: (name:string)=>void
    changeSurname: (surname:string)=>void
    deleteChat: (chatId:string)=>void
}

export const useMe = create<IMeStore>((set, get) =>({
    _socket: null,
  
    onConnect(newSocket) {
        set({_socket:newSocket})

        newSocket.on(ClientNameEvents.eventsOnMe,({type, data}:EventMe)=>{
            console.log(`${ClientNameEvents.eventsOnMe} data:`, {type, data})
            
            switch(type){
                case ME_EVENT_INIT:{
                    set({
                        me:data.me
                    })
                    break
                }
                case ME_EVENT_CHANGE_NAME:{
                    const me = get().me
                    if(!me)return
                    set({me:{...me, name:data.name}})
                    break
                }
                case ME_EVENT_CHANGE_SURNAME:{
                    const me = get().me
                    if(!me)return
                    set({me:{...me, surname:data.surname}})
                    break
                }
                default:{
                    break
                }
            }
        })
        newSocket.emit(ServerNameEvents.subscribeOnMe)


        newSocket.on(ClientNameEvents.eventsOnChats,({type, data}:EventMeChats)=>{
            console.log(`${ClientNameEvents.eventsOnChats} data:`, {type, data})
            
            switch(type){
                case MECHATS_EVENT_INIT:{
                    set({ chats:data.chats })
                    break
                }
                case MECHATS_EVENT_CHANGE_NAME:{
                    const { chats }=get()
                    if(!chats)return
                    const chat = chats?.find(c=>c.user.id === data.userId)
                    if(!chat)return
                    chat.user.name = data.name
                    set({chats:[...chats]})
                }
                default:{
                    break
                }
            }
        })
        newSocket.emit(ServerNameEvents.subscribeOnChats)

    },
    onDisconnect() {
        const { _socket } = get()
        set({_socket:null})
        
        _socket?.off(ClientNameEvents.eventsOnMe)
        _socket?.off(ClientNameEvents.eventsOnChats)
    },

    changeName(name) {
        const { _socket } = get()
        _socket?.emit(ServerNameEvents.changeName,name)
    },
    changeSurname(surname) {
        const { _socket } = get()
        _socket?.emit(ServerNameEvents.changeSurname,surname)
    },
    deleteChat(chatId){
        const { _socket } = get()
        _socket?.emit(ServerNameEvents.deleteChat,chatId)
    }
}))
