import styles from "./Chat.module.scss";

import { useEffect, useState } from "react";

import { IMessage } from "@/common/chat.interface";
import { DeleteMessage, GetAllMessage, GetChatInfo, SendMessage } from "../../../../actions/Chat.actions";

import ChatHeader from "./ui/ChatHeader";
import ChatMessages from "./ui/ChatMessages";
import ChatInput from "./ui/ChatInput";
import { IMyChat } from "@/common/me.interface";


export default function Chat({id}:{id:string}) {
    // console.log(`Render Chat(${id}) `);

    const [info,setInfo] = useState<IMyChat>();    
    const [messages,setMessages] = useState<IMessage[]>();

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

        return ()=>{
            stoper.abort()
        }
    },[]);

    const removeMessage = (messageId:string)=>{
        DeleteMessage(messageId).then(res=>{
            if(res){
                GetAllMessage(id).then(res=>{setMessages(res);});
            }
        });
    }

    const addMessage = (text:string)=>{
        SendMessage(id,text).then((res)=>{
            if(res){
                GetAllMessage(id).then(res=>{setMessages(res);});
            }
        });
    }
    

    return (
        <div className={styles.chat}>
            <ChatHeader info={info}/>
            <ChatMessages messages={messages} remove={removeMessage} />            
            <ChatInput sendMessage={addMessage}/>
        </div>
    );
}
