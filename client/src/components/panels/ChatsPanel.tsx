import { useState } from "react";
import ChatList from "../message/ChatList";
import AddChatModal from "../modals/AddChatModal";
import styles from "./ChatsPanel.module.scss";

export default function ChatsPanel() {
    const [isActiveModal,setActiveModal] = useState(true);
    
    return (
        <div className={styles.chats_panel}>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <ChatList/>
            <div className={styles.btn_add_chat} onClick={()=>setActiveModal((pa)=>!pa)}>
                +
            </div>
            <AddChatModal isActive={isActiveModal} setActive={setActiveModal}/>
        </div>
    );
}
