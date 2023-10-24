import { useMe } from "@/store/Me";
import Chat from "../сomponents/chat/Chat";
import { useEffect } from "react";
import { useChat } from "@/store/Chat";


export default function ChatPanel() {
    console.log('Render ChatPanel')
    const chatId = useMe(state=>state.selectedChatId)

    const fgfg = useChat()
    useEffect(()=>{
        fgfg.init(chatId)
        return ()=>{fgfg.clear()}
    },[chatId])
    
    return(<Chat key={chatId} id={chatId} />)
}
