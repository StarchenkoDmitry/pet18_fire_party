import styles from "./MessageBox.module.scss";
import { Message as MessageData } from "@/common/inerfaces";



export interface MessageProps{
    mes: MessageData;
}

export default function MessageBox({mes}:MessageProps) {
    return (
        <div className={styles.message}>
            <div className={styles.message_createAt}>{mes.createAt.toString()}</div>
            <p className={styles.message_text}>{mes.text}</p>
        </div>
    )
}