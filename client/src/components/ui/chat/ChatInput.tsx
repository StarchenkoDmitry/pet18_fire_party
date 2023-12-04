import styles from "./ChatInput.module.scss";

import { useRef, useState } from "react";

import { useChat } from "@/store/Chat";


export default function ChatInput() {

    const addMessage = useChat(state=>state.addMessage)

    const refka = useRef<HTMLInputElement>(null)
    const [text,setText] = useState('')

    const buttonSend = ()=>{
        const message = refka.current?.value || ''
        setText('')
        addMessage(message)
    }

    const changeText = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value)
    }
    
    return(
        <div className={styles.chatInputContainer}>
            <div className={styles.chatInput}>
                <div className={styles.cloudInput}>
                    <button className={styles.selectSmile}>smile</button>
                    <input 
                        ref={refka}
                        className={styles.input}
                        type="text"
                        value={text}
                        placeholder="message"
                        onChange={changeText}
                    />
                </div>
                {/* TODO: поместить img в button */}
                <img
                    className={styles.send}
                    src="/img/send.png"
                    alt="send"
                    onClick={buttonSend}
                />
            </div>
        </div>
    )
}
