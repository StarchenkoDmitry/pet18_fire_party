import styles from "./ChatInput.module.scss";

import { useState } from "react";

import { useChat } from "@/store/Chat";

export default function ChatInput() {
    const addMessage = useChat((state) => state.addMessage);

    const [text, setText] = useState("");

    const sendMessage = () => {
        const message = text || "";
        setText("");
        addMessage(message);
    };

    const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.chatInputContainer}>
            <div className={styles.chatInput}>
                <div className={styles.cloudInput}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="message"
                        value={text}
                        onChange={changeText}
                    />
                </div>
                <button className={styles.btn_send} onClick={sendMessage}>
                    <img className={styles.send} src="/img/send.png" alt="send" />
                </button>
            </div>
        </div>
    );
}
