import styles from "./ChatView.module.scss";

import { useState } from "react";

import { GetImageUrl } from "@/utils/Image";
import { IChatWithUser } from "@/common/me.interface";

import EditChatModal from "../../modals/EditChatModal";
import { useMe } from "@/store/Me";


const MOUSE_RIGHT = 2

export interface ChatViewProps{
    selected?: boolean
    chat: IChatWithUser
    selectChat?: (chatId:string)=>void
    online?: boolean
}

export default function ChatView({
    chat,
    selectChat,
    selected = false,
    online,
}:ChatViewProps) {

    const [showEditModal,setShowEditModal] = useState(false)
    const [cordsModal,setCordsModal] = useState({x:0,y:0})

    const imageURL = GetImageUrl(chat.user.imageID)

    const deleteChat = useMe(state=>state.deleteChat)

    const eventClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if(event.button === MOUSE_RIGHT){
            event.preventDefault()
            setShowEditModal(true)
            setCordsModal({
                x:event.clientX,
                y:event.clientY,
            })
        }else if(event.button === 0){
            setShowEditModal(false)
            if(selectChat) selectChat(chat.id)
        }
    }

    const closeModal = ()=>{
        setShowEditModal(false)
    }

    const eventDeleteChat = ()=>{
        deleteChat(chat.id)
    }
    
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
                <span 
                    data-online={online}
                    className={styles.userName}
                >{chat.user.name}</span>
                <div className={styles.lastMessage}>this is a last message</div>
            </div>
            {
                showEditModal && 
                <EditChatModal 
                    toDeleteChat={eventDeleteChat}
                    toClose={closeModal}
                    cords={cordsModal}
                />
            }
        </div>
    )
}
