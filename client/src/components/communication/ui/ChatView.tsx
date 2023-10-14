import styles from "./ChatView.module.scss";

import { IChatView } from "@/common/me.interface";


export interface ChatViewProps{
    chat:IChatView;
    selectChat?:(chatId:string)=>void;
}

export default function ChatView({chat,selectChat}:ChatViewProps) {

    const selectChatEvent = ()=>{
        if(selectChat) selectChat(chat.id);
    }

    const imageURL = !chat.user.imageID ? "/img/user.png" : 
    `http://127.0.0.1:3000/api/image/buffer/${chat.user.imageID}`;


    return (
        <div className={styles.chatview} onClick={selectChatEvent}>
            <img className={styles.userImage} src={imageURL} alt={`the avatar of ${chat.user.name}`} />

            <div className={styles.secondBlock}>
                <span className={styles.userName}>{chat.user.name}</span>
                <br/>
                <span>this is a last message</span>
            </div>
        </div>
    );
}
