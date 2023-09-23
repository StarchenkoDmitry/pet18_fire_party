'use client'
import { useState } from "react";
import styles from "./ChatList.module.scss";

const list = [{
    id:"679579579",
    name:"Eugee",
    lastMessage:"Dmika is lalka",
    type: "friend",
    img:"/imgraw/users/eugene.png", 
},{
    id:"786779",
    name:"DuckGame",
    lastMessage:"",
    type: "kanal",
    img:"/imgraw/users/squezee.png",
},{
    id:"78678678548",
    name:"Daddy",
    lastMessage:"",
    type: "kanal",
    img:"/imgraw/users/squezee.png",
}];

export default function MassageList() {
    const [sf,dfgfg] = useState("fgfg");
    console.log("Render ChatList:", sf) 

    const randerList = list.map(e=><div key={e.id} className={styles.message_item}>
        <img className={styles.img} src={e.img} alt=""/>
        <div className={styles.block_right}>
            <div className={styles.name} >{e.name}</div>
            <div>{e.lastMessage}</div>
        </div>
    </div>)

    return (
        <div className={styles.message_list + " "}>
            {randerList}
        </div>
    );
}


// list.push(...list,...list);
// list.push(...list,...list);

// list.forEach(e=>{
//     e.id+= Math.random().toString();
//     console.log("Eid: ",e.id);
// });