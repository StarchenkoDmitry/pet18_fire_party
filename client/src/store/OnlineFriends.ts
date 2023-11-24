import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IUseConnect } from "./Connent";
import { ClientNameEvents, ServerNameEvents } from "@/common/gateway.interfaces";
import { EventFriendOnline } from "@/common/onlineUsers.interface";


export interface IOnlineFriendsStore extends IUseConnect{
    _socket:Socket | null
    onlines:string[]
}

export const useOnlineFriends = create<IOnlineFriendsStore>((set, get) =>({
    _socket: null,
    onlines:[],

    onConnect(newSocket) {
        set({_socket:newSocket})

        newSocket.timeout(5000).emit(ServerNameEvents.subOnChangeOnline,(error:any,data:string[]) => {
            set({onlines:[...data]})
        })

        newSocket.on(ClientNameEvents.changeOnline,(data:EventFriendOnline)=>{
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
