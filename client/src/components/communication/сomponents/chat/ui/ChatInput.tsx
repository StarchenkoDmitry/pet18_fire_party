import styles from "./ChatInput.module.scss";

import { useRef, useState } from "react";


export interface ChatInputProps{
    sendMessage?:(text:string)=>void;
}

export default function ChatInput({sendMessage}:ChatInputProps) {
    const refka = useRef<HTMLInputElement>(null);
    const [text,setText] = useState('');

    const buttonSend = ()=>{
        const message = refka.current?.value || "";
        setText('');
        if(sendMessage) sendMessage(message);
    }

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value);
    }
    
    return(
        <div className={styles.container_input}>
            <div className={styles.block_command_input}>
                <input ref={refka} className={styles.input} type="text" value={text} onChange={changeInput}/>
                <button className={styles.btn_send} onClick={buttonSend}>Send</button>
            </div>
        </div>
    );
}
