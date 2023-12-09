import styles from "./ChatMessages.module.scss";

import { useLayoutEffect, useRef, useState } from "react";

import MessageBox from "./MessageBox";
import { useChat } from "@/store/Chat";


export default function ChatMessages() {
    const messages = useChat(state=>state.messages)

    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [fixed,setFixed] = useState(true)

    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const messConRef = messagesContainerRef.current
        if (!messConRef) return
        //check if scroll is at the end
        const _fix = messConRef.scrollHeight - messConRef.scrollTop === messConRef.clientHeight
        if(fixed !== _fix){
            setFixed(_fix)
        }
    }

    useLayoutEffect(()=>{
        if (messagesContainerRef.current && fixed){
            messagesEndRef.current?.scrollIntoView()
            // messagesEndRef.current?.scrollIntoView({behavior:"smooth"})
        }
    },[messages])

    if(messages){
        return(
            <div 
                className={styles.messagesContainer + " scrollbar1"}
                ref={messagesContainerRef}
                onScroll={handleScroll}
            >
                <div className={styles.messages}>
                    <div ref={messagesEndRef}></div>
                    {
                        messages.map((e,i)=><MessageBox key={e.id} message={e}/>)
                    }
                </div>
            </div>
        )
    }else{
        return(
            <div className={styles.messagesContainer + " scrollbar1"}></div>
        )
    }
}
