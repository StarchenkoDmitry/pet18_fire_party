import { DeleteMessage, GetAllMessage, SendMessage } from "@/actions/Chat.actions";
import { IMessage } from "@/common/chat.interface";
import { IMyChat } from "@/common/me.interface";
import { Socket } from "socket.io-client";
import { create } from "zustand";


export interface IChatStore{
    id:string

    // inited:boolean
    socket:Socket| null

    info?:IMyChat
    messages?:IMessage[]

    init:(chatId:string,socket:Socket|null)=>void
    clear:()=>void
    
    addMessage:(text:string)=>void
    removeMessage:(messageId:string)=>void
}


// function changeChat(set,get,chatId){

// }

export const useChat = create<IChatStore>((set, get) =>({
    id:"",
    socket:null,
    // inited:false,

    init:(chatId, socket)=>{
        console.log("IChatStore init chatId: ",chatId)
        
        if(get().socket === socket){
            get().socket?.off("onNewMessage")
        }

        set({
            id:chatId,
            socket:socket
        })
 
        if(!chatId || !socket) return

        socket.off("onNewMessage")

        socket.emit("subOnChat",{ chatId: get().id },(data:any)=>{
            console.log("subOnChat: ",data)
            set({
                info:data.info,
                messages:data.messages
            })

            socket.on("onNewMessage",(data:IMessage)=>{
                console.log("onNewMessage: ",data)
                const message = get().messages;
                if(get().id === data.chatId)
                set({
                    messages:[data,...message?? []]
                })
            })
        })
    },
    clear() {
        // console.log("IChatStore clear")
        set({
            id:"",
            socket:null,

            info: undefined,
            messages: undefined,
        })
    },
    addMessage(text) {
        SendMessage(get().id, text)
        .then((res)=>{
        });
    },
    removeMessage(messageId) {
        DeleteMessage(get().id,messageId).then(res=>{
            if(res){
                GetAllMessage(get().id).then(res=>{
                    set({messages:res})
                })
            }
        });
    },
}))
