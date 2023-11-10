import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IUseConnect } from "./Connent";


export interface IFriendsOnlineStore extends IUseConnect{
    _socket:Socket | null
    friendsOnline:string[]
}

export const useFriendsOnline = create<IFriendsOnlineStore>((set, get) =>({
    _socket: null,
    friendsOnline:[],

    onConnect(newSocket) {
        set({_socket:newSocket})

        newSocket.timeout(5000).emit('subOnChangeOnline',"TEST",(error:any,data?:any) => {
            console.log(`subOnChangeOnline data: ${data}, error:${error}`)
            // set({me:data})
        })

        newSocket.on("changeOnline",(data:any)=>{
            switch(data){
                case "5675757":{
                    break;
                }
                default:{                
                    break;
                }
            }
        })
    },

    onDisconnect() {
        set({_socket:null})
    },
}))
