import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { IUserForMe } from "@/common/user.interface";
import { IMyChat } from "@/common/me.interface";
import { IUseConnect } from "./Connent";


export interface IMeStore extends IUseConnect{
    me?:IUserForMe
    chats?:IMyChat[]
    socket:Socket | null

    // selectedChatId: string
    // selectChat:(chatId:string)=>void
}

export const useMe = create<IMeStore>((set, get) =>({
    connected:false,
    socket: null,
  
    onConnect(newSocket) {
        newSocket.timeout(5000).emit('getMe',(error:any,data?:IUserForMe) => {
            // console.log('getMe: ',data)
            set({me:data})
        })

        newSocket.timeout(5000).emit('getMyChats',(error:any,data?:IMyChat[]) => {
            // console.log('getMyChats: ',data)
            set({chats:data})
        })

        set({socket:newSocket})
    },
    onDisconnect() {
        
    },
}))



  // selectedChatId:'',

    
    // selectChat(chatId){
    //     set({selectedChatId:chatId})
    // },