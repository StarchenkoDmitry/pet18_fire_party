import { DeleteMessage, GetAllMessage } from "@/actions/Chat.actions";
import { IMessage } from "@/common/chat.interface";
import { CHAT_EVENT_ADDMESSAGE, CHAT_EVENT_REMOVEMESSAGE, ChatEvent } from "@/common/gateway.interfaces";
import { IMyChat } from "@/common/me.interface";
import { Socket } from "socket.io-client";
import { create } from "zustand";


export interface IChatStore{
    id:string
    socket:Socket | null
    newId:string
    newSocket:Socket | null

    doingChange: boolean

    info?:IMyChat
    messages?:IMessage[]

    init:(chatId:string,socket:Socket|null)=>void
    loadStore:()=>void
    saveStore:()=>void
    
    doChange:()=>void
    clear:()=>void

    subOnChat:(socket: Socket)=>void
    unsubOnChat:(socket: Socket)=>void
    
    addMessage:(text:string)=>void
    removeMessage:(messageId:string)=>void
}


export const useChat = create<IChatStore>((set, get) =>({
    id:"",
    socket:null,
    newId:"",
    newSocket:null,
    doingChange: false,

    init:async (chatId, socket)=>{
        console.log("IChatStore init chatId: ",chatId);
        set({newId:chatId,newSocket:socket})
        
        get().doChange()
    },
    loadStore(){
        const { id } = get()
        if(!id) return
        const chatStr = localStorage.getItem(`chat(${id})`)
        if(chatStr){
            const obj = JSON.parse(chatStr)
            set({
                info: obj.info,
                messages: obj.messages,
            })
        }
    },
    saveStore(){
        const { id, info, messages } = get()
        if(!id) return
        localStorage.setItem(`chat(${id})`,JSON.stringify({
            info:info,
            messages:messages,
        }))
    },
    async doChange(){
        const { newId, id, newSocket, socket, doingChange,
            subOnChat, unsubOnChat, loadStore } = get()

        if(doingChange) return;
        if(newId === id && newSocket === socket) return;

        set({
            id:newId,
            socket:newSocket,
            doingChange:true,
        })
       
        if(newSocket !== socket){
            if(socket) unsubOnChat(socket)

            if(newSocket){
                try {
                    loadStore()

                    const req = await newSocket?.timeout(1000).emitWithAck("subOnChat",{ chatId: newId })
                    console.log("subOnChat req:", req)
                    set({
                        info: req.info,
                        messages: req.messages
                    })
                    subOnChat(newSocket)
                } catch (error) {
                    console.log("ChatStore:", error)
                }
            }
        }
        else if(newSocket && newId !== id){
            unsubOnChat(newSocket)

            try {
                loadStore()

                const req = await newSocket?.timeout(1000).emitWithAck("subOnChat",{ chatId: newId })
                console.log("subOnChat req:", req)
                set({
                    info: req.info,
                    messages: req.messages
                })
                subOnChat(newSocket)
            } catch (error) {
                console.log("ChatStore:", error)
            }
        }
        set({ doingChange:false })
    },

    subOnChat(socket){
        socket.on("onChatEvent", ({type, data}:ChatEvent)=>{
            console.log("onChatEvent data:", {type, data})
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
    unsubOnChat(socket){
        socket.off('onChatEvent')
    },

    clear:()=>{
        console.log("IChatStore clear")
        
        get().saveStore()

        get().socket?.off('onChatEvent')

        set({
            id:"",
            socket:null,

            newId:"",
            newSocket:null,
            doingChange:false,

            info: undefined,
            messages: undefined,
        })
    },
    addMessage:(text)=>{
        get().socket?.emit("addMessage", { chatId:get().id, text: text })
    },
    removeMessage:(messageId)=>{
        get().socket?.emit("removeMessage", { chatId:get().id, messageId:messageId })
    },
}))






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
