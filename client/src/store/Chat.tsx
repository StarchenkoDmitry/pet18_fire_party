import { DeleteMessage, GetAllMessage, GetChatInfo, SendMessage } from "@/actions/Chat.actions";
import { IMessage } from "@/common/chat.interface";
import { IMyChat } from "@/common/me.interface";
import { Socket } from "socket.io-client";
import { create } from "zustand";

export interface IChatStore{
    id:string

    socket:Socket| null

    info?:IMyChat
    messages?:IMessage[]

    init:(chatId:string,socket:Socket|null)=>void
    clear:()=>void
    
    addMessage:(text:string)=>void
    removeMessage:(messageId:string)=>void
}


export const useChat = create<IChatStore>((set, get) =>({
    id:"",
    socket:null,

    init:(chatId, socket)=>{
        console.log("IChatStore init chatId: ",chatId)
        set({
            id:chatId,
            socket:socket
        })

        if(!get().id) return

        GetChatInfo(get().id).then(res=>{
            set({ info:res })
        }).catch(()=>{ })
        
        GetAllMessage(get().id).then(res=>{
            set({ messages:res })
        }).catch(()=>{ })
        if(!socket) return

        // socket.emit("subscribeChat","datachated"+ Math.random())
        // socket.send("TESTCLIENT ghrthrt-"+Math.random())

        socket.emit("subChat",{
            chatId:get().id
        },(data:any)=>{
            console.log("EMIT: ",data)
        })
    },
    clear() {
        console.log("IChatStore clear")
        set({
            id:"",
            info: undefined,
            messages: undefined,
        })
    },
    addMessage(text) {
        SendMessage(get().id, text).then((res)=>{
            if(res){
                GetAllMessage(get().id).then(res=>{
                    set({messages:res})
                })
            }
        });
    },
    removeMessage(messageId) {
        DeleteMessage(messageId).then(res=>{
            if(res){
                GetAllMessage(get().id).then(res=>{
                    set({messages:res})
                })
            }
        });
    },
}))
