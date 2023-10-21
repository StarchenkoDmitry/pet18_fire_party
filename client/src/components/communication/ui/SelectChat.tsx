import styles from "./SelectChat.module.scss";

import { useMe } from "@/store/Me";
import { useEffect } from "react";


export default function SelectChat() {
    
    return (
        <div className={styles.selectChat}>
            <span>Please select a chat</span>
            <Todos/>
        </div>
    );
}

function Todos(){
    const me = useMe();

    useEffect(()=>{
        me.connect();
    },[])

    const addTodoEvent = ()=>{
        me.addTodo(`Text-${Math.random().toString()}`)
    }

    return(
        <div>
            <button onClick={addTodoEvent}>Add</button>
            {JSON.stringify(me.todos)}
            
        </div>
    );
}