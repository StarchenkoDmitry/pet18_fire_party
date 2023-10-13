import styles from "./ChatView.module.scss";

import { IChatView } from "@/common/interfaces";


export interface ChatViewProps{
    chat:IChatView;
    selectChat?:(chatId:string)=>void;
}

export default function ChatView({chat,selectChat}:ChatViewProps) {
    // console.log("ChatView: chat:",chat);

    const selectChatEvent = ()=>{
        // console.log("selected the chat with id: ",chat.id)
        if(selectChat) selectChat(chat.id);
    }
    
    return (
        <div className={styles.chatview} onClick={selectChatEvent}>
            <img className={styles.userImage} src={"/img/user.png"} alt={`the avatar of ${chat.user.name}`} />

            <div className={styles.secondBlock}>
                <span className={styles.userName}>{chat.user.name}</span>
                <br/>
                <span>this is a last message</span>
            </div>
        </div>
    );
}
