import styles from "./ChatInput.module.scss";

import { useRef, useState } from "react";


export interface ChatInputProps{
    sendMessage?: (text:string)=>void
}

export default function ChatInput({sendMessage}:ChatInputProps) {
    const refka = useRef<HTMLInputElement>(null)
    const [text,setText] = useState('')

    const buttonSend = ()=>{
        const message = refka.current?.value || ''
        setText('')
        if(sendMessage) sendMessage(message)
    }

    const changeText = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value)
    }
    
    return(
        <div className={styles.container_input}>
            <div className={styles.cloudInput}>
                <button className={styles.selectSmile}>smile</button>
                <input 
                    ref={refka}
                    className={styles.input}
                    type="text"
                    value={text}
                    placeholder="Message..."
                    onChange={changeText}
                />
            </div>
            <img
                className={styles.send}
                src="/img/send.png"
                alt=""
                onClick={buttonSend}
            />
        </div>
    )
}
