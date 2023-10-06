import { useEffect, useRef, useState } from "react";
import styles from "./Chat.module.scss";
import { DeleteMessage, GetAllMessage, SendMessage } from "../../actions/Actions";
import { IMessage } from "@/common/inerfaces";
import MessageBox from "./ui/MessageBox";

export type ChatProps={
    id:string
}

export default function Chat({id}:ChatProps) {
    console.log(`Render Chat(${id})`)
    const refka = useRef<HTMLInputElement>(null);

    const [messages,setMessages] = useState<IMessage[] | undefined>(undefined);

    useEffect(()=>{
        GetAllMessage(id).then(res=>{setMessages(res);});
    },[id]);

    const toRemove = (mesID:string)=>{
        DeleteMessage(mesID).then(res=>{
            // console.log("DeleteMessage: ",res)
            if(res){
                GetAllMessage(id).then(res=>{setMessages(res);});
            }
        });
    }

    const addMessage = ()=>{
        const message = refka.current?.value || "";
        SendMessage(id,message).then((res)=>{
            if(res){
                GetAllMessage(id).then(res=>{setMessages(res);});
            }
        });
    }

    return (
        <div className={styles.chat}>
            <div className={styles.header}>
                <div className={styles.img}>
                    <img src="http://127.0.0.1:3000/api/image/buffer/7fcc2423-8ec3-4020-9e70-b976207654a2" />
                </div>                
                <span className={styles.name}>Eugen</span>
                <span style={{margin:"1em"}}>{id}</span>
            </div>
            <div className={styles.messages}>
                {
                    messages?.map((e,i)=><MessageBox key={i} mes={e}toRemove={()=>toRemove(e.id)}/>)
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
