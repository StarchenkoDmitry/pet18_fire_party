import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IUserForMe } from "@/common/user.interface";
import { IMyChat } from "@/common/me.interface";
import { IUseConnect } from "./Connent";
import { IResSubOnMe, ME_EVENT_CHANGE_NAME, ME_EVENT_CHANGE_SURNAME, MeEvent } from "@/common/gateway.interfaces";


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

        newSocket.timeout(5000).emit('subOnMe',(error:any,data?:IResSubOnMe) => {
            console.log('subOnMe:', data)
            if(!data) return

            set({
                me:data.me,
                chats:data.chats
            })
            
            newSocket.on("eventOnMe",({type, data}:MeEvent)=>{
                console.log('eventOnMe data:', {type, data})
                
                switch(type){
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
        })
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
