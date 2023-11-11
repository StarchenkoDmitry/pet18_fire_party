import styles from "./ChatView.module.scss";

import { IMyChat } from "@/common/me.interface";


export interface ChatViewProps{
    selected?: boolean
    chat:IMyChat;
    selectChat?:(chatId:string)=>void;
    online?:boolean
}

export default function ChatView({chat,selectChat,selected = false,online}:ChatViewProps) {
    // console.log("ChatView selected: ",selected)
    const selectChatEvent = ()=>{
        if(selectChat) selectChat(chat.id);
    }

    const imageURL = !chat.user.imageID ? "/img/user.png" : 
    `http://${window.location.hostname}:3000/api/image/buffer/${chat.user.imageID}`;


    return (
        <div className={styles.chatview + ` ${selected ? styles.selected : ""}`} onClick={selectChatEvent}>
            <img className={styles.userImage} src={imageURL} alt={`the avatar of ${chat.user.name}`} />

            <div className={styles.secondBlock}>
                <span className={styles.userName + (online ? ` ${styles.userNameOnline} ` : "")}>{chat.user.name}</span>
                <br/>
                <span>this is a last message</span>
            </div>
        </div>
    );
}
