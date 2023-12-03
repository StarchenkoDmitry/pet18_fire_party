import styles from "./ChatPanel.module.scss";

import ChatHeader from "../chat/ChatHeader";
import ChatMessages from "../chat/ChatMessages";
import ChatInput from "../chat/ChatInput";
import { useChat } from "@/store/Chat";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export default function ChatPanel() {
    // console.log(`Render ChatPanel(${id}) `)

    const { id } = useParams()

    const { open, close, info, messages, addMessage, removeMessage } = useChat()

    useEffect(()=>{
        open(id || "")
        return ()=>{close()}
    },[id])

    return (
        <div className={styles.chat}>
            <ChatHeader info={info}/>
            <ChatMessages messages={messages} remove={removeMessage} />
            <ChatInput sendMessage={addMessage}/>
        </div>
    )
}
