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
}];


export default function ChatsList() {
    return (
        <div className={styles.chats_list}>
            <input className={styles.inputer} type="text" value='Поиск...'/>

            {list.map((c,i)=><div key={i} className={styles.chat}>
                <img className={styles.chat_img} src={c.img}/>
                <span className={styles.chat_name} >{c.name}</span>
            </div>)}
        </div>
    );
}
