import { useMe } from "@/store/Me";
import Chat from "../сomponents/chat/Chat";
import { useEffect } from "react";
import { useChat } from "@/store/Chat";


export default function ChatPanel() {
    console.log('Render ChatPanel')

    const chatId = useMe(state=>state.selectedChatId)
    const socket = useMe(state=>state.socket)

    const chatStore = useChat()
    useEffect(()=>{
        chatStore.init(chatId, socket)
        return ()=>{chatStore.clear()}
    },[chatId, socket])
    
    return(<Chat key={chatId} id={chatId} />)
}
