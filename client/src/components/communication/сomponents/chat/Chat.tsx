import styles from "./Chat.module.scss";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { IGetChatInfo, IMessage } from "@/common/chat.interface";
import { DeleteMessage, GetAllMessage, GetChatInfo, SendMessage } from "../../../../actions/Chat.actions";
import MessageBox from "./ui/MessageBox";


export default function Chat() {
    let { id:_id } = useParams();
    const id = _id || "";
    console.log(`Render Chat(${id}) `);

    const refka = useRef<HTMLInputElement>(null);

    const [messages,setMessages] = useState<IMessage[] | undefined>(undefined);

    const [info,setInfo] = useState<IGetChatInfo>();

    useEffect(()=>{
        const stoper = new AbortController();
        
        GetChatInfo(id,stoper).then((res)=>{
            setInfo(res);
        }).catch(()=>{
            setInfo(undefined);
        });
        
        GetAllMessage(id,stoper).then(res=>{
            setMessages(res);
        }).catch(()=>{
            setMessages(undefined);
        });

        return ()=>{stoper.abort()}
    },[id]);

    const toRemove = (mesID:string)=>{
        DeleteMessage(mesID).then(res=>{
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
                <div className={styles.userAvatar}>
                    <img src="http://127.0.0.1:3000/api/image/buffer/7fcc2423-8ec3-4020-9e70-b976207654a2" />
                </div>
                <span className={styles.name}>{info? info.user.name : "Loading"}</span>
                <span style={{margin:"1em"}}>ChatID: {id}</span>
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
