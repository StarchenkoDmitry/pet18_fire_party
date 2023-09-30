import { useEffect, useState } from "react";
import ChatList from "../message/ChatList";
import AddChatModal from "../modals/AddChatModal";
import styles from "./ChatsPanel.module.scss";
import api from "@/api/api";

export default function ChatsPanel() {
    const [isActiveModal,setActiveModal] = useState(false);

    const [text,setText] = useState<any>("");

    useEffect(()=>{
        const controller = new AbortController();
        
        const func1 = async () => {
            const res = await api.get('chat/me',{signal: controller.signal});
            console.log(res.data);
            return res.data;
        }

        func1().then((res)=>{
            setText(JSON.stringify(res));
        }).catch(()=>{
            setText(undefined);
        });

        return ()=>{controller.abort()}
    },[]);
    
    return (
        <div className={styles.chats_panel}>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <div className={styles.block_poisk}>
                <span>{text}</span>
            </div>
            <ChatList/>
            <div className={styles.btn_add_chat} onClick={()=>setActiveModal((pa)=>!pa)}>
                +
            </div>
            <AddChatModal isActive={isActiveModal} setActive={setActiveModal}/>
        </div>
    );
}
