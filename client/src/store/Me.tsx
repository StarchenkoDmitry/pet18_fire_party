import { create } from "zustand";
import { Socket } from "socket.io-client";
import { IUserForMe } from "@/common/user.interface";
import { EventMe, IMyChat, ME_EVENT_CHANGE_NAME, ME_EVENT_CHANGE_SURNAME, ME_EVENT_CHAT_INIT, ME_EVENT_INIT, TypeEventMe } from "@/common/me.interface";
import { IUseConnect } from "./Connent";


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

        newSocket.on(TypeEventMe.eventsOnMe,({type, data}:EventMe)=>{
            console.log(`${TypeEventMe.eventsOnMe} data:`, {type, data})
            
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
        newSocket.emit(TypeEventMe.subscribeOnMe)


        newSocket.on(TypeEventMe.eventsOnChats,({type, data}:EventMe)=>{
            console.log(`${TypeEventMe.eventsOnMe} data:`, {type, data})
            
            switch(type){
                case ME_EVENT_CHAT_INIT:{
                    set({ chats:data.chats })
                    break
                }
                default:{
                    break
                }
            }
        })
        newSocket.emit(TypeEventMe.subscribeOnChats)

    },
    onDisconnect() {
        set({_socket:null})
    },

    changeName(name) {
        const { _socket } = get()
        _socket?.emit("changeName",name)
    },
    changeSurname(surname) {
        const { _socket } = get()
        _socket?.emit("changeSurname",surname)
    },
    deleteChat(chatId){
        const { _socket } = get()
        _socket?.emit('deleteChat',chatId)
    }
}))
