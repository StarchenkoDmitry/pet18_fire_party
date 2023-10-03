// 'use client'
import { useRef, useState } from "react";
import styles from "./Chat.module.scss";


interface IMessage{
    text:string;
}
let messageList: IMessage[]= [{
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nemo voluptatibus quo quam harum hic ducimus ex facere eos? Fugit animi corporis molestias eos? Magnam corrupti iusto quaerat sapiente itaque?"
},{
    text:"1orem ipsum dolor sit amet consectetur adipisicing elit. Numquam nemo voluptatibus quo quam harum hic ducimus ex facere eos? Fugit animi corporis molestias eos? Magnam corrupti iusto quaerat sapiente itaque?"
}];



export default function Chat() {
    console.log("Rendering Chat")
    const refka = useRef<HTMLInputElement>(null);

    const [list,setList] = useState(()=>[...messageList]);

    const addMessage = ()=>{
        console.log(refka.current?.value);
        setList([...list,{
            text: refka.current ? refka.current.value : "fsdf"
        }]);
    }

    return (
        <div className={styles.chat}>
            <div className={styles.header}>
                <div className={styles.img}>
                    <img src="/imgraw/users/eugene.png" alt="" />
                </div>
                <span className={styles.name}>Eugen</span>
            </div>
            <div className={styles.messages}>
            {
                list.map((e,i)=><p key={i}>{e.text}</p>)
            }
            </div>
            <div className={styles.container_input}>
                <div className={styles.block_command_input}>
                    <input ref={refka} className={styles.input} type="text" />
                    <button className={styles.btn_send} onClick={addMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}
