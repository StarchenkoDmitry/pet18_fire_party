import ChatList from "../message/ChatList";
import styles from "./ChatsPanel.module.scss";

export default function ChatsPanel() {
    
    return (
        <div className={styles.chats_panel}>
            <div className={styles.block_poisk}>
                <input className={styles.input} type="text" />
            </div>
            <ChatList/>
        </div>
    );
}
