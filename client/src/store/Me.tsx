import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IUserForMe } from "@/common/user.interface";
import { IMyChat } from "@/common/me.interface";
import { IUseConnect } from "./Connent";


export interface IMeStore extends IUseConnect{
    _socket:Socket | null

    me?:IUserForMe
    chats?:IMyChat[]

    changeName:(name:string)=>void
    changeSurname:(surname:string)=>void
    deleteChat:(chatId:string)=>void
}

export const useMe = create<IMeStore>((set, get) =>({
    _socket: null,
  
    onConnect(newSocket) {
        newSocket.timeout(5000).emit('getMe',(error:any,data?:IUserForMe) => {
            // console.log('getMe: ',data)
            set({me:data})
            
            newSocket.on("changeMe",({type, payload}:{type:string,payload:any})=>{
                console.log('changeMe data:', {type, payload})
                switch(type){
                    case "setName":{
                        const me = get().me
                        if(!me)return
                        set({me:{...me, name:payload}})
                        break
                    }
                    case "setSurname":{
                        const me = get().me
                        if(!me)return
                        set({me:{...me, surname:payload}})
                        break
                    }
                    default:{
                        break
                    }
                }
            })
        })

        newSocket.timeout(5000).emit('getMyChats',(error:any,data?:IMyChat[]) => {
            // console.log('getMyChats: ',data)
            set({chats:data})
        })

        set({_socket:newSocket})
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
