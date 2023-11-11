import { useMe } from "@/store/Me";
import Chat from "../сomponents/chat/Chat";
import { useEffect } from "react";
import { useChat } from "@/store/Chat";
import { useParams } from "react-router-dom";


export default function ChatPanel() {
    // console.log('Render ChatPanel')

    const { id } = useParams();
    const chatStore = useChat()

    useEffect(()=>{
        chatStore.open(id || "")
        return ()=>{chatStore.close()}
    },[id])
    


    return(<Chat key={id || ""} id={id || ""} />)
}
