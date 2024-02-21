import styles from "./ChatPanel.module.scss";

import ChatHeader from "../chat/ChatHeader";
import ChatMessages from "../chat/ChatMessages";
import ChatInput from "../chat/ChatInput";
import { useChat } from "@/store/Chat";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function ChatPanel() {
    // console.log(`Render ChatPanel(${id}) `)

    const { id } = useParams();

    const open = useChat((stat) => stat.open);
    const close = useChat((stat) => stat.close);

    useEffect(() => {
        open(id || "");
        return () => {
            close();
        };
    }, [id]);

    return (
        <div className={styles.chat}>
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
        </div>
    );
}
