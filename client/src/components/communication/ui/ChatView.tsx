import styles from "./ChatView.module.scss";

import { GetImageUrl } from "@/utils/Image";
import { IMyChat } from "@/common/me.interface";


export interface ChatViewProps{
    selected?: boolean
    chat: IMyChat
    selectChat?: (chatId:string)=>void
    online?: boolean
}

export default function ChatView({ chat, selectChat, selected = false, online }:ChatViewProps) {
    const selectChatEvent = ()=>{
        if(selectChat) selectChat(chat.id)
    }

    const imageURL = GetImageUrl(chat.user.imageID)
    
    return (
        <div data-selected={selected} className={styles.chatview} onClick={selectChatEvent}>
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
        </div>
    )
}
