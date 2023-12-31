import { Socket } from "socket.io-client";
import { create } from "zustand";

import { IMessage } from "@/common/chat.interface";
import { IMyChat } from "@/common/me.interface";
import { IUseConnect } from "./Connent";

import {
    CHAT_EVENT_ADDMESSAGE,
    CHAT_EVENT_REMOVEMESSAGE,
    ChatEvent, IResSubOnChat
} from "@/common/gateway.interfaces";


export interface IChatStore extends IUseConnect{
    id:string
    newId:string

    isLoaded: boolean
    loadingData: boolean

    info?:IMyChat
    messages?:IMessage[]

    socket:Socket | null

    open:(id:string)=>void
    close:()=>void

    _reqChatSocket:()=>void
    _subSocket:()=>void
    _unsubSocket:()=>void
    
    addMessage:(text:string)=>void
    removeMessage:(messageId:string)=>void
}

type IChatGET = () => IChatStore
type IChatSET =  (partial: IChatStore | Partial<IChatStore> | ((state: IChatStore) => IChatStore | Partial<IChatStore>), replace?: boolean | undefined) => void

function loadStore(id:string, set:IChatSET){
    if(!id) return
    const chatStr = localStorage.getItem(`chat(${id})`)
    if(chatStr){
        const obj = JSON.parse(chatStr)
        set({
            info: obj.info,
            messages: obj.messages,
        })
    }
}
function saveStore(get:IChatGET){
    const { id, info, messages } = get()
    if(!id) return
    localStorage.setItem(`chat(${id})`,JSON.stringify({
        info:info,
        messages:messages,
    }))
}


export const useChat = create<IChatStore>((set, get) =>({
    id:"",
    newId:"",
    isLoaded:false,
    loadingData: false,
    socket: null,
    

    open(id:string){
        // console.log(`ChatStore open(${id})`);
        set({
            newId:id,
            isLoaded:false        
        })
        this._reqChatSocket()
    },
    close(){
        // console.log("IChatStore clear")
        this._unsubSocket()
        saveStore(get)

        set({
            id:"",
            newId:"",
            // loadingData:false,
            isLoaded:true,

            info: undefined,
            messages: undefined,
        })
    },
    async _reqChatSocket(){
        // console.log("IChatStore reqChatSocket")
        const { newId, id, loadingData, isLoaded, socket } = get()

        if(loadingData || isLoaded) return;
        set({
            // isLoaded:false,
            loadingData:true
        })

        if(!newId){
            //очистка чата
            this._unsubSocket()
            set({
                info:undefined,
                messages:undefined,
                id:newId,
                loadingData:false,
                isLoaded:true,
            })
            return;
        }

        if(newId !== id){
            //подгрузить кешированые данные чата
            loadStore(newId,set)
        }
        
        this._unsubSocket()

        const resChat : IResSubOnChat = await socket?.emitWithAck('subOnChat',{chatId:newId})
        // console.log("IChatStore resChat: ",resChat)
        if(resChat){
            set({
                info: resChat.info,
                messages:resChat.messages,
            })
            this._subSocket()
        }        

        set({
            id: newId,
            loadingData:false,
            isLoaded:true,
        })
        this._reqChatSocket()
    },
    _unsubSocket(){
        const { socket } = get()
        socket?.off("onChatEvent")
    },
    _subSocket(){
        const { socket } = get()
        if(!socket) return

        socket.on("onChatEvent", ({type, data}:ChatEvent)=>{
            // console.log("onChatEvent data:", {type, data})
            switch(type){
                case CHAT_EVENT_ADDMESSAGE:{
                    const { id, messages } = get();
                    if(id === data.chatId){
                        set({
                            messages:[data,...messages?? []]
                        })
                    }
                    break;
                }
                case CHAT_EVENT_REMOVEMESSAGE:{
                    // console.log("IChatStore CHAT_EVENT_REMOVEMESSAGE")
                    const { id, messages } = get();
                    if(id === data.chatId && messages){
                        set({
                            messages:messages.filter((m)=>m.id !== data.id)
                        })
                    }
                    break;
                }
                default:{                
                    break;
                }
            }
        })
    },
    addMessage:(text)=>{
        get().socket?.emit("addMessage", { chatId:get().id, text: text })
    },
    removeMessage:(messageId)=>{
        // console.log("IChatStore removeMessage")
        get().socket?.emit("removeMessage", { chatId:get().id, messageId:messageId })
    },

    onConnect(newSocket) {
        // console.log("IChatStore onConnect")
        set({
            socket:newSocket,
            isLoaded:false,
        })
        get()._reqChatSocket()
    },
    onDisconnect() {
        // console.log("IChatStore onDisconnect")
        this._unsubSocket()
        set({
            socket:null,
            isLoaded:false
        })
    },
}))
