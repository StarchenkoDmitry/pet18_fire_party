import styles from "./ChatMessages.module.scss";

import { IMessage } from "@/common/chat.interface";
import MessageBox from "./MessageBox";

export interface ChatMessagesProps{
    messages?: IMessage[];
    remove?: (messageId:string)=>void;
}

export default function ChatMessages({messages,remove}:ChatMessagesProps) {
    
    if(messages){
        return(
            <div className={styles.messages}>
            {
                messages.map((e,i)=><MessageBox key={i} mes={e} toRemove={()=>{
                    if(remove) remove(e.id)
                }}/>)
            }
            </div>
        );
    }else{
        return(
            <div className={styles.messages}>
                <span>LOADING</span>
            </div>
        );
    }
}