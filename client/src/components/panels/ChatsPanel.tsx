import { useEffect, useState } from "react";
import ChatList from "../message/ChatList";
import AddChatModal from "../modals/AddChatModal";
import styles from "./ChatsPanel.module.scss";
import api from "@/api/api";
import { Chat } from "@/common/inerfaces";

export default function ChatsPanel() {
    const [isActiveModal,setActiveModal] = useState(false);

    const [chats,setChats] = useState<Chat[]>([]);

    useEffect(()=>{
        const controller = new AbortController();
        
        const func1 = async () => {
            const res = await api.get('chat/me',{signal: controller.signal});
            console.log(res.data);
            return res.data;
        }

        func1().then((res)=>{
            setChats(res);
        }).catch(()=>{
            setChats([]);
        });

        return ()=>{controller.abort()}
    },[]);

    const rend_chats = chats.map(e=><div key={e.pubid}>
        <span>{e.nameChat} {e.pubid}</span>
    </div>)
    
    return (
        <div className={styles.chats_panel}>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <div className={styles.block_poisk}>
                { rend_chats }
            </div>
            <ChatList/>
            <div className={styles.btn_add_chat} onClick={()=>setActiveModal((pa)=>!pa)}>
                +
            </div>
            <AddChatModal isActive={isActiveModal} setActive={setActiveModal}/>
        </div>
    );
}
