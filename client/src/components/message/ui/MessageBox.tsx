import { DeleteMessage } from "@/actions/Actions";
import styles from "./MessageBox.module.scss";
import { Message as MessageData } from "@/common/inerfaces";



export interface MessageProps{
    mes: MessageData;
}

export default function MessageBox({mes}:MessageProps) {
    const toDelete = ()=>{
        DeleteMessage(mes.id).then(res=>{
            console.log("DeleteMessage: ",res)
        });
    }

    return (
        <div className={styles.message}>
            <div className={styles.message_head}>
                <div className={styles.message_createAt}>{mes.createAt.toString()}</div>
                <button onClick={toDelete}>Delete</button>
            </div>
            <p className={styles.message_text}>{mes.text}</p>
        </div>
    )
}