import styles from "./MessageBox.module.scss";

import { IMessage } from "@/common/chat.interface";

export interface MessageProps{
    message: IMessage;
    toRemove?: ()=>void; 
}

export default function MessageBox({message,toRemove}:MessageProps) {
    const createAt = convertCustomData(message.createAt)
    return (
        <div className={styles.message}>
            <div className={styles.message_head}>
                <button onClick={toRemove}>Delete</button>
            </div>            
            <p className={styles.message_text}>
                {message.text}
                <span className={styles.message_createAt1}>{createAt}</span>
                <span className={styles.message_createAt2}>{createAt}</span>
            </p>
        </div>
    )
}

function convertCustomData(dataStr:string | Date):string{
    const data = typeof dataStr === "string" ? new Date(dataStr) : dataStr
    const createAt = [data.getHours(), data.getMinutes()].map((x)=>{
        return x < 10 ? "0" + x : x
    }).join(":")
    return createAt
}
