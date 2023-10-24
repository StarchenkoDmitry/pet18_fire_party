import { IMyChat } from "@/common/me.interface";
import styles from "./ChatHeader.module.scss";


export interface ChatHeaderProps{
    info?:IMyChat;
}

export default function ChatHeader({info}:ChatHeaderProps) {
    
    if(info){
        const imageURL = !info.user.imageID ? "/img/user.png" :
        `http://${window.location.hostname}:3000/api/image/buffer/${info.user.imageID}`;

        return(
            <div className={styles.header}>
                <img className={styles.userAvatar} src={imageURL} alt="avatar" />
                <span className={styles.name}>Name: {info.user.name}</span>
                <span>ChatID: {info.id}</span>
            </div>
        );
    }else{
        return(
            <div className={styles.header}>
                <img className={styles.userAvatar} src={'/img/user.png'} />
                <span className={styles.name}>Loading</span>
                <span>ChatID: #####</span>
            </div>
        );
    }
}