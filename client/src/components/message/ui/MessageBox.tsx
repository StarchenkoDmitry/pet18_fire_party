import styles from "./MessageBox.module.scss";
import { IMessage as MessageData } from "@/common/interfaces";



export interface MessageProps{
    mes: MessageData;
    toRemove?: ()=>void; 
}

export default function MessageBox({mes,toRemove}:MessageProps) {
   
    return (
        <div className={styles.message}>
            <div className={styles.message_head}>
                <div className={styles.message_createAt}>{mes.createAt.toString()}</div>
                <button onClick={toRemove}>Delete</button>
            </div>
            <p className={styles.message_text}>{mes.text}</p>
        </div>
    )
}