// 'use client'
import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { GetAllMessage, SendMessage } from "../actions/Actions";
import { Message } from "@/common/inerfaces";


export type ChatInput={
    pubid:string
}

export default function Chat({pubid}:ChatInput) {
    console.log(`Render Chat(${pubid})`)
    const refka = useRef<HTMLInputElement>(null);

    const [messages,setMessages] = useState<Message[] | undefined>(undefined);

    useEffect(()=>{
        GetAllMessage(pubid).then(res=>{
            setMessages(res);
        });
    },[pubid]);

    const addMessage = ()=>{
        const message = refka.current?.value || "";
        SendMessage(pubid,message)
    }

    return (
        <div className={styles.chat}>
            <div className={styles.header}>
                <div className={styles.img}>
                    <img src="/imgraw/users/eugene.png" alt="" />
                </div>
                <span className={styles.name}>Eugen</span>
                <span style={{margin:"1em"}}>{pubid}</span>
            </div>
            <div className={styles.messages}>
                {
                    messages?.map((e,i)=><p key={i}>{e.text}</p>)
                }
            </div>
            <div className={styles.container_input}>
                <div className={styles.block_command_input}>
                    <input ref={refka} className={styles.input} type="text" />
                    <button className={styles.btn_send} onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}
