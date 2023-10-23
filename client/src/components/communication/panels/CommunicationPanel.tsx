import styles from "./CommunicationPanel.module.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GetMyChats } from "@/actions/Me.actions";

import AddChatModal from "../modals/AddChatModal";
import ChatView from "../ui/ChatView";
import Me from "../сomponents/me/Me";
import { IMyChat } from "@/common/me.interface";


export default function CommunicationPanel() {
    const params = useParams();
    // console.log("CommunicationsPanel params: ",params)
    
    const navigate = useNavigate();
    const [isActiveModal,setActiveModal] = useState(false);

    const [meChats,setMeChats] = useState<IMyChat[]>();

    useEffect(()=>{
        GetMyChats().then((res)=>{
           if(res)setMeChats(res);
        });
    },[]);
    
    const selectChat = (chatId:string)=>{
        navigate(`/chat/${chatId}`);
    }

    const closeModal = ()=>{ setActiveModal(false); }
    const openModal = ()=>{ setActiveModal(true); }

    const rend_chats = meChats?.map(e=><ChatView key={e.id} chat={e} selectChat={selectChat} 
        selected={params.id === e.id}/>)
    
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
    );
}
