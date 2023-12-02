import styles from "./ChatMessages.module.scss";

import { IMessage } from "@/common/chat.interface";
import MessageBox from "./MessageBox";

export interface ChatMessagesProps{
    messages?: IMessage[]
    remove?: (messageId:string)=>void
}

export default function ChatMessages({messages,remove}:ChatMessagesProps) {
    if(messages){
        return(
            <div className={styles.messages + " scrollbar1"}>
            {
                messages.map((e,i)=>{
                    const deleteMessage = ()=>{
                        if(remove) remove(e.id)
                    }
                    return(<MessageBox key={i} message={e} toRemove={deleteMessage}/>)
                })
            }
            </div>
        )
    }else{
        return(
            <div className={styles.messages}>
                <span>LOADING</span>
            </div>
        )
    }
}