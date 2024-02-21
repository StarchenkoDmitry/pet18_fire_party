import styles from "./ChatCard.module.scss";

import { useState } from "react";

import { GetImageUrl } from "@/utils/Image";

import EditChatModal from "../../modals/EditChatModal";
import { useMe } from "@/store/Me";
import { useNavigate } from "react-router-dom";
import { IChatWithUser } from "@/common/chat.interface";

const MOUSE_RIGHT = 2;

export interface ChatCardProps {
    selected?: boolean;
    chat: IChatWithUser;
    online?: boolean;
}

export default function ChatCard({ chat, selected = false, online }: ChatCardProps) {
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [cordsModal, setCordsModal] = useState({ x: 0, y: 0 });

    const imageURL = GetImageUrl(chat.user.imageID);

    const deleteChat = useMe((state) => state.deleteChat);

    const eventClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.button === MOUSE_RIGHT) {
            event.preventDefault();
            setShowEditModal(true);
            setCordsModal({
                x: event.clientX,
                y: event.clientY,
            });
        } else if (event.button === 0) {
            setShowEditModal(false);
            navigate(`/chat/${chat.id}`);
        }
    };

    const closeModal = () => {
        setShowEditModal(false);
    };

    const eventDeleteChat = () => {
        deleteChat(chat.id);
    };

    return (
        <div
            data-selected={selected}
            className={styles.chatview}
            onClick={eventClick}
            onContextMenu={eventClick}
        >
            <img
                data-online={online}
                className={styles.userImage}
                src={imageURL}
                alt={`the avatar of ${chat.user.name}`}
            />

            <div className={styles.userInfo}>
                <span data-online={online} className={styles.userName}>
                    {chat.user.name}
                </span>
                <div className={styles.lastMessage}>this is a last message</div>
            </div>
            {showEditModal && (
                <EditChatModal
                    toDeleteChat={eventDeleteChat}
                    toClose={closeModal}
                    cords={cordsModal}
                />
            )}
        </div>
    );
}
