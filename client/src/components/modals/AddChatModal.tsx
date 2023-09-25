import { useEffect, useState } from "react";
import styles from "./AddChatModal.module.scss";
import api from "@/api/api";

export interface Props{
    isActive:boolean;
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddChatModal({isActive,setActive}:Props) {
    const [text,setText] = useState("");
    console.log("Text: ",text)

    const closeEvent =()=>{ setActive(false); }

    useEffect(()=>{
        const controller = new AbortController();
        const func1 = async () => {
            const res = await api.get(`user/findAllByName/${text}`,{
                signal: controller.signal
            });
            console.log(res.data);
            return res.data;
        }
        func1().then(()=>{

        }).catch(()=>{
            
        });

        return ()=>{controller.abort()}
    },[text]);

    return (
        <div className={styles.modal +" "+ (isActive ? styles.active: "")} onClick={closeEvent}>
            <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>
                <div>
                    <span className={styles.input_lable}>Add chat</span>
                    <input className={styles.input} type="text" value={text}
                    onChange={(e)=>{
                        setText(e.target.value);
                    }}/>
                </div>
            </div>
        </div>
    )
}
