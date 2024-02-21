import styles from "./CommunicationPanel.module.scss";

import { useState } from "react";

import Me from "./me/Me";
import AddChatModal from "../../modals/AddChatModal";
import ChatCard from "./ChatCard";

import { useMe } from "@/store/Me";
import { useChat } from "@/store/Chat";
import { useOnlineFriends } from "@/store/OnlineFriends";

export default function CommunicationPanel() {
    // console.log("Render CommunicationPanel")

    const online = useOnlineFriends((state) => state.onlines);
    const chats = useMe((state) => state.chats);
    const selectedChatId = useChat((state) => state.id);

    const [isActiveModal, setActiveModal] = useState(false);

    const closeModal = () => {
        setActiveModal(false);
    };
    const openModal = () => {
        setActiveModal(true);
    };

    const rend_chats = chats?.map((e) => {
        const isOnline = online.includes(e.user.id);
        return (
            <ChatCard key={e.id} chat={e} online={isOnline} selected={e.id === selectedChatId} />
        );
    });

    return (
        <div className={styles.communication_panel}>
            <Me />
            <div className={styles.list_chats + " scrollbar1"}>{rend_chats}</div>
            <button className={styles.btn_add_chat} onClick={openModal}>
                <span className={styles.btn_add_chat__inner}>❤</span>
            </button>
            {isActiveModal && <AddChatModal close={closeModal} />}
        </div>
    );
}
