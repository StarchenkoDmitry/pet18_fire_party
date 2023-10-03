// 'use client'
import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { GetAllMessage, SendMessage } from "../actions/Actions";
import { Message } from "@/common/inerfaces";


interface IMessage{
    text:string;
}

let messageList: IMessage[]= [{
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nemo voluptatibus quo quam harum hic ducimus ex facere eos? Fugit animi corporis molestias eos? Magnam corrupti iusto quaerat sapiente itaque?"
},{
    text:"1orem ipsum dolor sit amet consectetur adipisicing elit. Numquam nemo voluptatibus quo quam harum hic ducimus ex facere eos? Fugit animi corporis molestias eos? Magnam corrupti iusto quaerat sapiente itaque?"
}];

export type ChatInput={
    pubid:string
}

export default function Chat({pubid}:ChatInput) {
    console.log(`Render Chat(${pubid})`)
    const refka = useRef<HTMLInputElement>(null);

    // const [list,setList] = useState(()=>[...messageList]);
    const [messages,setMessages] = useState<Message[] | undefined>(undefined);

    useEffect(()=>{
        GetAllMessage(pubid).then(res=>{
            setMessages(res);
        });
    },[pubid]);

    const addMessage = ()=>{
        // console.log(refka.current?.value);
        // setList([...list,{
        //     text: refka.current ? refka.current.value : "fsdf"
        // }]);
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
