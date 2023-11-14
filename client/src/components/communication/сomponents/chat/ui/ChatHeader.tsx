import { IMyChat } from "@/common/me.interface";
import styles from "./ChatHeader.module.scss";


export interface ChatHeaderProps{
    info?:IMyChat;
}

export default function ChatHeader({info}:ChatHeaderProps) {    
    if(info){
        const imageURL = !info.user.imageID ? "/img/user.png" :
        `http://${window.location.hostname}:3000/api/image/buffer/${info.user.imageID}`

        return(
            <div className={styles.header}>
                <img className={styles.userAvatar} src={imageURL} alt="avatar" />
                <div className={styles.userInfo}>
                    <div className={styles.name}>{info.user.name}</div>
                    <div>ChatID: {info.id}</div>
                </div>
            </div>
        )
    }else{
        return(
            <div className={styles.header}>
                <img className={styles.userAvatar} src={'/img/user.png'} />
                <span className={styles.name}>Loading</span>
                <span>ChatID: #####</span>
            </div>
        )
    }
}
