import styles from "./ChatMessages.module.scss";

import MessageBox from "./MessageBox";
import { useChat } from "@/store/Chat";


export default function ChatMessages() {
    const messages = useChat(state=>state.messages)
    const removeMessage = useChat(state=>state.removeMessage)
    
    if(messages){
        return(
            <div className={styles.messagesContainer + " scrollbar1"}>
                <div className={styles.messages}>
                    {
                        messages.map((e,i)=>{
                            const deleteMessage = ()=>{
                                removeMessage(e.id)
                            }
                            return(<MessageBox key={i} message={e} toRemove={deleteMessage}/>)
                        })
                    }
                </div>
            </div>
        )
    }else{
        return(
            <div className={styles.messagesContainer + " scrollbar1"}>
                {
                /* <div className={styles.loadingMessages}>
                    <span className={styles.loadingText}>loading</span>
                </div> */
                }
            </div>
        )
    }
}
