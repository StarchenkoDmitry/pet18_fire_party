import styles from "./CommunicationPanel.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Me from "../сomponents/me/Me";
import AddChatModal from "../modals/AddChatModal";
import ChatView from "../ui/ChatView";

import { useMe } from "@/store/Me";
import { useChat } from "@/store/Chat";
import { useFriendsOnline } from "@/store/FriendsOnline";

export default function CommunicationPanel() {
    // console.log("Render CommunicationsPanel")
    const navigate = useNavigate()
    
    const online = useFriendsOnline(state=>state.onlines)
    // console.log("CommunicationsPanel online:",online)
    const chats = useMe((state)=>state.chats)
    const selectedChatId = useChat((state)=>state.id)

    const [isActiveModal,setActiveModal] = useState(false)
    
    const navigateChat = (chatId:string)=>{
        navigate(`/chat/${chatId}`)
    }

    const closeModal = ()=>{ setActiveModal(false) }
    const openModal = ()=>{ setActiveModal(true) }

    const rend_chats = chats?.map(e=>{
        const isOnline  = online.includes(e.user.id)
        console.log("isOnline:",isOnline)
        return (<ChatView 
            key={e.id}
            chat={e}
            selectChat={navigateChat}
            online={isOnline}
            selected={e.id === selectedChatId}
        />)
    })
    
    return (
        <div className={styles.communication_panel}>
            <Me/>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <div className={styles.list_chats}>
                { rend_chats }
            </div>
            <div className={styles.btn_add_chat} onClick={openModal}>❤</div>
            { isActiveModal && <AddChatModal doClose={closeModal}/> }
        </div>
    )
}
