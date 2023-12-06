import { Socket } from "socket.io-client";
import { create } from "zustand";
import { IUseConnect } from "./Connent";
import { ClientNameActions, ServerNameActions } from "@/common/gateway.interfaces";
import { 
    CHAT_EVENT_ERROR_INIT,
    CHAT_EVENT_INIT,
    CHAT_EVENT_ADDMESSAGE,
    CHAT_EVENT_REMOVEMESSAGE,
    
    ChatEvent,
    IChatWithUser,
} from "@/common/chat.interface";
import { IMessage } from "@/common/message.interface";


export interface IChatStore extends IUseConnect{
    id:string
    newId:string

    isLoaded: boolean
    isLoading: boolean

    info?:IChatWithUser
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
type IChatSET = (partial: IChatStore | Partial<IChatStore> | ((state: IChatStore) => IChatStore | Partial<IChatStore>), replace?: boolean | undefined) => void

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
    isLoading: false,
    socket: null,

    open(id:string){
        console.log(`ChatStore open(${id})`);

        set({ newId:id })//, isLoaded:false
        const { isLoading, _reqChatSocket } = get()
        if(!isLoading){
            _reqChatSocket()
        }
    },
    close(){
        // console.log("IChatStore clear")
        // this._unsubSocket()
        // saveStore(get)

        set({
            id:"",
            newId:"",
            isLoaded:false,
            isLoading:false,

            info: undefined,
            messages: undefined,
        })
    },
    async _reqChatSocket(){
        // console.log("IChatStore reqChatSocket")
        const { newId, id, isLoading, isLoaded, socket } = get()

        if(isLoading || !socket) return
        if(newId === id)return

        if(!newId){
            //очистка чата
            set({
                id:newId,
                newId:newId,
                isLoading:false,
                isLoaded:false,
                info:undefined,
                messages:undefined,
            })
            return;
        }

        set({
            isLoaded:false,
            isLoading:true
        })

        //подгрузить кешированые данные чата
        // loadStore(newId,set)
                
        // console.log("IChatStore chatId: ",newId)
        socket.emit(ServerNameActions.subscribeOnChat,{ chatId:newId })
    },
    _unsubSocket(){
        const { socket } = get()
        socket?.off(ClientNameActions.onChatEvent)
    },
    _subSocket(){
        const { socket } = get()
        if(!socket) return

        socket.on(ClientNameActions.onChatEvent, ({type, data}:ChatEvent)=>{
            console.log("ClientNameEvents.onChatEvent data:", {type, data})
            switch(type){
                case CHAT_EVENT_INIT:{
                    set({
                        isLoaded:true,
                        isLoading:false,
                        info:data.info,
                        messages:data.messages,
                        id: data.info.id
                    })

                    //if after load have newId begine load chat
                    const { id, newId, _reqChatSocket } = get()
                    if(id !== newId){
                        _reqChatSocket()
                    }
                    break
                }
                case CHAT_EVENT_ERROR_INIT:{
                    set({ 
                        id: data.chatId,
                        isLoaded:false,
                        isLoading:false,
                    })
                    
                    //if after load have newId begine load chat
                    const { id, newId, _reqChatSocket } = get()
                    if(id !== newId){
                        _reqChatSocket()
                    }
                    break
                }
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
                    const { id, messages } = get();
                    if(id === data.chatId && messages){
                        set({
                            messages:messages.filter((m)=>m.id !== data.id)
                        })
                    }
                    break;
                }
                default:{ break; }
            }
        })
    },

    addMessage:(text)=>{
        get().socket?.emit(ServerNameActions.createMessage, { chatId:get().id, text: text })
    },
    removeMessage:(messageId)=>{
        get().socket?.emit(ServerNameActions.removeMessage, { chatId:get().id, messageId:messageId })
    },

    onConnect(newSocket) {
        // console.log("IChatStore onConnect")
        set({ socket:newSocket })
        get()._subSocket()
        get()._reqChatSocket()
    },
    onDisconnect() {
        // console.log("IChatStore onDisconnect")
        get()._unsubSocket()
        set({
            socket:null,
            isLoaded:false,
            isLoading:false,
        })
    },
}))
