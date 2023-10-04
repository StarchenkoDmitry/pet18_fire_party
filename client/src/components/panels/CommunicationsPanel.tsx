import { useEffect, useState } from "react";
import AddChatModal from "../modals/AddChatModal";
import styles from "./CommunicationsPanel.module.scss";
import api from "@/api/api";
import { MeChats } from "@/common/inerfaces";
import { useNavigate } from "react-router-dom";

export default function CommunicationsPanel() {
    const navigate = useNavigate();
    const [isActiveModal,setActiveModal] = useState(false);

    const [listchats,setListChats] = useState<MeChats>();

    useEffect(()=>{
        const controller = new AbortController();
        
        const func1 = async () => {
            const res = await api.get('chat/me',{signal: controller.signal});
            console.log("chat/me res: ", res.data);
            return res.data;
        }

        func1().then((res)=>{
            setListChats(res);
        }).catch(()=>{
            setListChats(undefined);
        });

        return ()=>{controller.abort()}
    },[]);
    
    const onSelectFriendChat = (chat_pubid:string)=>{
        navigate(`/chat/${chat_pubid}`);
    }

    const rend_chats = listchats?.chats.map(e=><div key={e.pubid} className={styles.friend_chat} onClick={()=>onSelectFriendChat(e.pubid)}>
        <span>{e.users.map(e=>e.name)}</span>
    </div>)
    
    return (
        <div className={styles.chats_panel}>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <div className={styles.list_chats}>
                { rend_chats }
            </div>
            {/* <ChatList/> */}
            <div className={styles.btn_add_chat} onClick={()=>setActiveModal((pa)=>!pa)}>
                +
            </div>
            <AddChatModal isActive={isActiveModal} setActive={setActiveModal}/>
        </div>
    );
}
