import styles from "./Chat.module.scss";

import { useEffect } from "react";

import ChatHeader from "./ui/ChatHeader";
import ChatMessages from "./ui/ChatMessages";
import ChatInput from "./ui/ChatInput";
import { useChat } from "@/store/Chat";


export default function Chat({id}:{id:string}) {
    console.log(`Render Chat(${id}) `)

    const { info, messages, init, clear, addMessage, removeMessage } = useChat()

    return (
        <div className={styles.chat}>
            <ChatHeader info={info}/>
            <ChatMessages messages={messages} remove={removeMessage} />            
            <ChatInput sendMessage={addMessage}/>
        </div>
    );
}
