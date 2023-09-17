"use client"
import { ChangeEvent, useState } from "react";
import styles from "./ChatsList.module.scss";

interface IChatData{
    img:string;
    name:string;
}



const list:IChatData[] =[{
    img:"/imgraw/users/eugene.png",
    name:"Eugene",
},{
    img:"/imgraw/users/squezee.png",
    name:"squezee",
},{
    img:"/imgraw/users/squezee.png",
    name:"squezee",
},{
    img:"/imgraw/users/squezee.png",
    name:"squezee",
},{
    img:"/imgraw/users/squezee.png",
    name:"squezee",
},{
    img:"/imgraw/users/squezee.png",
    name:"squezee",
}];


export default function ChatsList() {
    const [value,setValue] = useState('');

    const onChangeEv = (event: ChangeEvent<HTMLInputElement>)=>{
        console.log(event.target.value);
        setValue(event.target.value);
    }    

    return (
        <>
            <input onChange={onChangeEv} className={styles.inputer} type="text" placeholder="Поиск" value={value}/>

            <button onClick={()=>{console.log("Click.")}} className={styles.btn_frineds} >Друзья</button>


            {list.map((c,i)=><div key={i} className={styles.chat}>
                <img className={styles.chat_img} src={c.img}/>
                <span className={styles.chat_name} >{c.name}</span>
            </div>)}
        </>
    );
}
