import styles from "./CommunicationsPanel.module.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GetMeChats } from "@/actions/Actions";
import { IMeChats } from "@/common/interfaces";

import AddChatModal from "../modals/AddChatModal";
import ChatView from "./ui/ChatView";
import Me from "../me/Me";


export default function CommunicationsPanel() {
    const navigate = useNavigate();
    const [isActiveModal,setActiveModal] = useState(false);
    const [listchats,setListChats] = useState<IMeChats>();

    useEffect(()=>{
        GetMeChats().then((res)=>{
            setListChats(res);
        });
    },[]);
    
    const selectChat = (chatId:string)=>{
        navigate(`/chat/${chatId}`);
    }

    const closeModal = ()=>{
        setActiveModal(false);
    }

    const openModal = ()=>{
        setActiveModal(true);
    }

    const rend_chats = listchats?.chats.map(e=><ChatView key={e.id} chat={e} selectChat={selectChat} />)
    
    return (
        <div className={styles.chats_panel}>
            <Me/>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <div className={styles.list_chats}>
                { rend_chats }
            </div>
            <div className={styles.btn_add_chat} onClick={openModal}>
                +
            </div>
            { isActiveModal && <AddChatModal doClose={closeModal}/> }
        </div>
    );
}
