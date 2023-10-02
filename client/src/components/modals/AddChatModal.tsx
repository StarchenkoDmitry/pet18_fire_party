import { useEffect, useState } from "react";
import styles from "./AddChatModal.module.scss";
import api from "@/api/api";
import { User } from "@/common/inerfaces";
import { CreateChat } from "../actions/Actions";

export interface Props{
    isActive:boolean;
    setActive:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddChatModal({isActive,setActive}:Props) {
    const [text,setText] = useState("");
    // console.log("Text: ",text)
    const [users,setUsers] = useState<User[] | undefined>();

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
        func1().then((res)=>{
            setUsers(res);
        }).catch(()=>{
            setUsers(undefined);
        });

        return ()=>{controller.abort()}
    },[text]);


    const addChat = (pubid:string)=>{
        CreateChat(pubid);
    }

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
                {
                    users?.map((u,i)=><div key={i}>
                        <span>{u.login}</span>
                        <button onClick={()=>addChat(u.pubid)} >add</button>
                    </div>)
                }
            </div>
        </div>
    )
}
