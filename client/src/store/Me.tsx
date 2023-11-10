import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IUserForMe } from "@/common/user.interface";
import { IMyChat } from "@/common/me.interface";
import { IUseConnect } from "./Connent";


export interface IMeStore extends IUseConnect{
    _socket:Socket | null

    me?:IUserForMe
    chats?:IMyChat[]
}

export const useMe = create<IMeStore>((set, get) =>({
    _socket: null,
  
    onConnect(newSocket) {
        newSocket.timeout(5000).emit('getMe',(error:any,data?:IUserForMe) => {
            // console.log('getMe: ',data)
            set({me:data})
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
}))
