import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { IUserForMe } from "@/common/user.interface";
import { IMyChat } from "@/common/me.interface";


export interface IMeStore{
    connected:boolean
    socket: Socket | null

    me?:IUserForMe
    chats?:IMyChat[]
    selectedChatId: string


    connect:()=>void
    disconnect:()=>void

    selectChat:(chatId:string)=>void
}

export const useMe = create<IMeStore>((set, get) =>({
    connected:false,
    socket: null,
    selectedChatId:'',

    connect:async ()=>{
        const socket :Socket= io("http://127.0.0.1:3020",{
            autoConnect:false,
            withCredentials:true,
            timeout:2000,
            reconnection:true
        })

        socket.on("connect", () => {
            console.log("connect:", socket.id)

            set({
                connected:true,
                socket:socket
            })

            socket.timeout(5000).emit('getMe',(error:any,data?:IUserForMe) => {
                console.log('getMe: ',data)
                set({me:data})
            })

            socket.timeout(5000).emit('getMyChats',(error:any,data?:IMyChat[]) => {
                console.log('getMyChats: ',data)
                set({chats:data})
            })

        });

        socket.on("connect_error", () => {
            console.log("Socket connect_error1: ")
        });

        socket.on('error',(error)=>{
            console.log('socket error: ',error)
        })

        socket.on("disconnect", (reason) => {
            console.log('socket disconnect reason: ',reason)
            set({connected:false})
        });
        
        console.log("Socket connectiong...")
        socket.connect()
    },

    disconnect:async ()=>{
        const {socket} = get()
        if(socket){
           socket.disconnect() 
        }
    },

    selectChat: (chatId)=>{
        set({selectedChatId:chatId})
    },
}))
