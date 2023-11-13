import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IUseConnect } from "./Connent";
import { EventFriendOnline } from "@/common/gateway.interfaces";


export interface IFriendsOnlineStore extends IUseConnect{
    _socket:Socket | null
    onlines:string[]
}

export const useFriendsOnline = create<IFriendsOnlineStore>((set, get) =>({
    _socket: null,
    onlines:[],

    onConnect(newSocket) {
        set({_socket:newSocket})

        newSocket.timeout(5000).emit('subOnChangeOnline',(error:any,data:string[]) => {
            set({onlines:[...data]})
        })

        newSocket.on("changeOnline",(data:EventFriendOnline)=>{
            // console.log(`changeOnline data:`, data)
            const { onlines } = get()
            if(data.isOnline){
                set({
                    onlines:[...onlines,data.userId]
                })
            }else{
                set({
                    onlines:onlines.filter(u=>u!==data.userId)
                })
            }
        })
    },

    onDisconnect() {
        set({_socket:null})
    },
}))
