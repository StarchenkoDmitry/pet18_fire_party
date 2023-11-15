import styles from "./AddChatModal.module.scss";

import { useEffect, useState } from "react";

import { IUser, IUserForSearch } from "@/common/user.interface";
import { FindAllByName } from "@/actions/User.actions";
import { CreateChat } from "@/actions/Chat.actions";
import { useUsersSearch } from "@/store/UsersSearch";
import { useConnect } from "@/store/Connent";



export interface Props{
    doClose?:()=>void
}

export default function AddChatModal({doClose}:Props) {
    const [text,setText] = useState("")
    // const [users,setUsers] = useState<IUser[] | undefined>()

    const { subConnect, unsubConnect} = useConnect.getState()

    const sercher = useUsersSearch.getState()
    const users = useUsersSearch(state=>state.users)

    useEffect(()=>{
        subConnect(sercher)

        return ()=>unsubConnect(sercher)
    },[])

    useEffect(()=>{
        sercher.search(text)
    },[text])

    const addChat = (id:string)=>{
        CreateChat(id)
    }

    const changeText = (event: React.ChangeEvent<HTMLInputElement>)=>{
        setText(event.target.value);
    }

    return (
        <div className={styles.modal +" "+ styles.active} onClick={doClose}>
            <div className={styles.modal_content} onClick={(e)=>e.stopPropagation()}>
                <div className={styles.blockSearch}>
                    <span className={styles.label}>Search by name</span>
                    <input className={styles.input} type="text" value={text}
                    onChange={changeText}/>
                </div>
                {
                    users?.map((u,i)=><div key={i}>
                        <span>{u.name}</span>
                        <button onClick={()=>addChat(u.id)} >add</button>
                    </div>)
                }
            </div>
        </div>
    )
}
