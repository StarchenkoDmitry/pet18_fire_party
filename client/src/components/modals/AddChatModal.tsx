import styles from "./AddChatModal.module.scss";

import { useEffect, useState } from "react";

import { IUser } from "@/common/interfaces";
import { CreateChat, FindAllByName } from "../../actions/Actions";


export interface Props{
    // isActive:boolean;
    // setActive:React.Dispatch<React.SetStateAction<boolean>>;
    doClose?:()=>void;
}

export default function AddChatModal({doClose}:Props) {
    const [text,setText] = useState("");    
    const [users,setUsers] = useState<IUser[] | undefined>();


    useEffect(()=>{
        const stoper = new AbortController();
        FindAllByName(text,stoper).then((res)=>{
            setUsers(res);
        }).catch(()=>{
            setUsers(undefined);
        });
        return ()=>{stoper.abort()}
    },[text]);


    const addChat = (id:string)=>{
        CreateChat(id);
    }

    return (
        <div className={styles.modal +" "+ styles.active} onClick={doClose}>
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
                        <button onClick={()=>addChat(u.id)} >add</button>
                    </div>)
                }
            </div>
        </div>
    )
}
