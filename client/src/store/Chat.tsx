import { DeleteMessage, GetAllMessage } from "@/actions/Chat.actions";
import { IMessage } from "@/common/chat.interface";
import { CHAT_EVENT_ADDMESSAGE, CHAT_EVENT_REMOVEMESSAGE, ChatEvent, IResSubOnChat } from "@/common/gateway.interfaces";
import { IMyChat } from "@/common/me.interface";
import { Socket } from "socket.io-client";
import { create } from "zustand";
import { IUseConnect } from "./Connent";




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

    reqChatSocket:()=>void
    subSocket:()=>void
    unsubSocket:()=>void
    
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
        this.reqChatSocket()
    },
    close(){
        // console.log("IChatStore clear")
        this.unsubSocket()
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
    async reqChatSocket(){
        // console.log("IChatStore reqChatSocket")
        const { newId, id, loadingData, isLoaded, socket } = get()

        
        if(loadingData || isLoaded) return;
        set({
            // isLoaded:false,
            loadingData:true
        })

        if(!newId){
            //очистка чата
            this.unsubSocket()
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
        
        this.unsubSocket()

        const resChat : IResSubOnChat = await socket?.emitWithAck('subOnChat',{chatId:newId})
        // console.log("IChatStore resChat: ",resChat)
        if(resChat){
            set({
                info: resChat.info,
                messages:resChat.messages,
            })
            this.subSocket()
        }        

        set({
            id: newId,
            loadingData:false,
            isLoaded:true,
        })
        this.reqChatSocket()
    },
    unsubSocket(){
        const { socket } = get()
        socket?.off("onChatEvent")
    },
    subSocket(){
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
        get().reqChatSocket()
    },
    onDisconnect() {
        // console.log("IChatStore onDisconnect")
        this.unsubSocket()
        set({
            socket:null,
            isLoaded:false
        })
    },
}))























// export interface IChatStore{
//     id:string
//     newId:string

//     doingChange: boolean

//     info?:IMyChat
//     messages?:IMessage[]

//     con?:IConnection

//     init:(com:IConnection)=>void
//     setID:(id:string)=>void

//     doChange:()=>void
//     clear:()=>void
    
//     addMessage:(text:string)=>void
//     removeMessage:(messageId:string)=>void
// }



// type IChatGET = () => IChatStore
// type IChatSET =  (partial: IChatStore | Partial<IChatStore> | ((state: IChatStore) => IChatStore | Partial<IChatStore>), replace?: boolean | undefined) => void





// function loadStore(id:string, set:IChatSET){
//     // if(!id) return
//     // const chatStr = localStorage.getItem(`chat(${id})`)
//     // if(chatStr){
//     //     const obj = JSON.parse(chatStr)
//     //     set({
//     //         info: obj.info,
//     //         messages: obj.messages,
//     //     })
//     // }
// }
// function saveStore(get:IChatGET){
//     // const { id, info, messages } = get()
//     // if(!id) return
//     // localStorage.setItem(`chat(${id})`,JSON.stringify({
//     //     info:info,
//     //     messages:messages,
//     // }))
// }


// export const useChat = create<IChatStore>((set, get) =>({
//     id:"",
//     newId:"",
//     newSocket:null,
//     doingChange: false,

//     init:async (con)=>{
//         // console.log("IChatStore init chatId: ",chatId);
//         // set({newId:chatId,newSocket:socket})
        
//         // get().doChange()
//     },
//     setID(id:string){

//     },
//     async doChange(){
//         const { newId, id, doingChange } = get()

//         if(doingChange) return;
//         if(newId === id && newSocket === socket) return;

//         set({
//             id:newId,
//             socket:newSocket,
//             doingChange:true,
//         })
       
//         if(newSocket !== socket){
//             if(socket) unsubOnChat(socket)

//             if(newSocket){
//                 try {
//                     loadStore(newId,set)

//                     const req = await newSocket?.timeout(1000).emitWithAck("subOnChat",{ chatId: newId })
//                     console.log("subOnChat req:", req)
//                     set({
//                         info: req.info,
//                         messages: req.messages
//                     })
//                     subOnChat(newSocket)
//                 } catch (error) {
//                     console.log("ChatStore:", error)
//                 }
//             }
//         }
//         else if(newSocket && newId !== id){
//             unsubOnChat(newSocket)

//             try {
//                 loadStore(newId,set)

//                 const req = await newSocket?.timeout(1000).emitWithAck("subOnChat",{ chatId: newId })
//                 console.log("subOnChat req:", req)
//                 set({
//                     info: req.info,
//                     messages: req.messages
//                 })
//                 subOnChat(newSocket)
//             } catch (error) {
//                 console.log("ChatStore:", error)
//             }
//         }
//         set({ doingChange:false })
//     },

//     subOnChat(socket){
//         socket.on("onChatEvent", ({type, data}:ChatEvent)=>{
//             console.log("onChatEvent data:", {type, data})
//             switch(type){
//                 case CHAT_EVENT_ADDMESSAGE:{
//                     const { id, messages } = get();
//                     if(id === data.chatId){
//                         set({
//                             messages:[data,...messages?? []]
//                         })
//                     }
//                     break;
//                 }
//                 case CHAT_EVENT_REMOVEMESSAGE:{
//                     const { id, messages } = get();
//                     if(id === data.chatId && messages){
//                         set({
//                             messages:messages.filter((m)=>m.id !== data.id)
//                         })
//                     }
//                     break;
//                 }
//                 default:{
                
//                     break;
//                 }
//             }
//         })
//     },
//     unsubOnChat(socket){
//         socket.off('onChatEvent')
//     },

//     clear:()=>{
//         console.log("IChatStore clear")
        
//         saveStore(get)

//         get().socket?.off('onChatEvent')

//         set({
//             id:"",
//             socket:null,

//             newId:"",
//             newSocket:null,
//             doingChange:false,

//             info: undefined,
//             messages: undefined,
//         })
//     },
//     addMessage:(text)=>{
//         get().socket?.emit("addMessage", { chatId:get().id, text: text })
//     },
//     removeMessage:(messageId)=>{
//         get().socket?.emit("removeMessage", { chatId:get().id, messageId:messageId })
//     },
// }))






// function getLocalChat(id:string){

// }



// id:"",
// socket:null,
// newId:"",
// newSocket:null,
// doingChange: false,

// init:async (chatId, socket)=>{
//     const { id : prevChatId, socket : prevSocket } = get()
//     console.log("IChatStore init chatId: ",chatId)

//     if(socket !== prevSocket){
//         set({ socket:socket })
//         if(prevSocket){
//             prevSocket.off("onNewMessage")
//         }

//         if(chatId && prevChatId !== chatId && socket){

//             //TODO: to load from localStore

//             const req = socket.timeout(1000).emitWithAck("subOnChat",{ chatId: chatId })
//             req.then((data:any)=>{
//                 console.log("subOnChat: ",data)
//                 set({
//                     info:data.info,
//                     messages:data.messages
//                 })
//                 socket.on("onNewMessage",(data:IMessage)=>{
//                     console.log("onNewMessage: ",data)
//                     const message = get().messages;
//                     if(get().id === data.chatId)
//                     set({
//                         messages:[data,...message?? []]
//                     })
//                 })
//             }).catch((error)=>{
//                 console.log("emitWithAck() error: ", error)
//             })
            
            

//             // socket.timeout(3000).emit("subOnChat",{ chatId: chatId },
//             // (error:any,data:any)=>{
//             //     console.log("subOnChat: ",data)
//             //     set({
//             //         info:data.info,
//             //         messages:data.messages
//             //     })
    
//             //     socket.on("onNewMessage",(data:IMessage)=>{
//             //         console.log("onNewMessage: ",data)
//             //         const message = get().messages;
//             //         if(get().id === data.chatId)
//             //         set({
//             //             messages:[data,...message?? []]
//             //         })
//             //     })
//             // })
//         }
//     }else{
        
//     }
// },
// doChange(){

// },



















        // const chatStr = localStorage.getItem(`chat(${chatId})`)
        // if(chatStr){
        //     const obj = JSON.parse(chatStr)
        //     set({
        //         info:obj.info,
        //         messages:obj.messages,
        //     })
        // }


        // localStorage.setItem(`chat(${get().id})`,JSON.stringify({
        //     info:get().info,
        //     messages:get().messages,
        // }))






        // set({
        //     id:chatId,
        //     socket:socket
        // })

        // if(!chatId || !socket) return


        // socket.off("onNewMessage")

        // socket.timeout(3000).emit("subOnChat",{ chatId: get().id },(error:any,data:any)=>{
        //     console.log("subOnChat: ",data)
        //     set({
        //         info:data.info,
        //         messages:data.messages
        //     })

        //     socket.on("onNewMessage",(data:IMessage)=>{
        //         console.log("onNewMessage: ",data)
        //         const message = get().messages;
        //         if(get().id === data.chatId)
        //         set({
        //             messages:[data,...message?? []]
        //         })
        //     })
        // })











// function sdfdfd(){
// }
// async function sdfdfd2(){
//     return 100;
// }

// // console.log("FUNNC1 ",sdfdfd)
// console.log("FUNNC1 typeof",typeof sdfdfd())
// // console.log("FUNNC2 ",sdfdfd2)
// console.log("FUNNC2 typeof",typeof sdfdfd2())

// console.log("FUNNC2 promise1",sdfdfd2())

// console.log("FUNNC2 promise2",Promise.resolve(sdfdfd2))
// console.log("F ",sdfdfd)
// console.log()
