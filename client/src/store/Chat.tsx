import { DeleteMessage, GetAllMessage, GetChatInfo, SendMessage } from "@/actions/Chat.actions";
import { IMessage } from "@/common/chat.interface";
import { IMyChat } from "@/common/me.interface";
import { create } from "zustand";

export interface IChatStore{
    id:string

    info?:IMyChat
    messages?:IMessage[]

    init:(chatId:string)=>void
    clear:()=>void

    addMessage:(text:string)=>void
    removeMessage:(messageId:string)=>void
}

export const useChat = create<IChatStore>((set, get) =>({
    id:"",

    init:(chatId)=>{
        console.log("IChatStore init chatId: ",chatId)
        set({id:chatId})

        const stoper = new AbortController()
        if(get().id.length === 0) return

        GetChatInfo(get().id,stoper).then(res=>{
            set({ info:res })
        }).catch(()=>{

        })
        
        GetAllMessage(get().id,stoper).then(res=>{
            set({ messages:res })
        }).catch(()=>{

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
