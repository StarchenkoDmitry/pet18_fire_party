import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { IUserForMe } from "@/common/user.interface";
import { IMyChat } from "@/common/me.interface";


export interface IMeStore{
    initialized:boolean
    connected:boolean,
    socket: Socket | null

    user?:IUserForMe
    chats?:IMyChat[]

    init:()=>void

    connect:()=>void
    disconnect:()=>void
}

export const useMe = create<IMeStore>((set, get) =>({
    initialized: false,
    connected:false,
    socket: null,

    init: () => {

    },
    connect:async ()=>{
        const socket :Socket= io("http://127.0.0.1:3020",{
            autoConnect:false,
            withCredentials:true,
            timeout:2000,
            reconnection:false
        })

        socket.on("connect", () => {
            console.log("connect:", socket.id)

            set(state=>({
                connected:true,
                socket:socket
            }))

            socket.timeout(5000).emit('getMe',(error:any,data?:IUserForMe) => {
                console.log('getMe: ',data)
                set(()=>({user:data}))
            })

            socket.timeout(5000).emit('getMyChats',(error:any,data?:IMyChat[]) => {
                console.log('getMyChats: ',data)
                set(()=>({chats:data}))
            })

        });

        socket.on("connect_error", () => {
            console.log("Socket connect_error1: ")
        });

        socket.on('error',(error)=>{
            console.log('socket error');
        })

        socket.on("disconnect", (reason) => {
            console.log('socket disconnect reason: ',reason);
        });
        
        console.log("Socket connectiong...")
        socket.connect();
    },

    disconnect:async ()=>{
        const {socket} = get();
        if(socket){
           socket.disconnect() 
        }
    },
}))
