import styles from "./Chat.module.scss";

const user = {
    img:"/imgraw/users/eugene.png",
    name:"Eugene",
}

export default function Chat() {
    return (
        <div className={styles.chat}>
            <div className={styles.header}>
                <img className={styles.avatar_img} src={user.img}/>
                <span className={styles.name}>{user.name}</span>
            </div>
        </div>
    );
}
