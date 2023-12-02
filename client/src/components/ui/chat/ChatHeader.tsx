import { useOnlineFriends } from "@/store/OnlineFriends";
import styles from "./ChatHeader.module.scss";
import { IMyChat } from "@/common/me.interface";
import { GetImageUrl } from "@/utils/Image";


export interface ChatHeaderProps{
    info?:IMyChat;
}

export default function ChatHeader({info}:ChatHeaderProps) {
    const onlines = useOnlineFriends(state=>state.onlines)
    
    if(info){
        const isOnline = onlines.includes(info.user.id)
        const imageURL = GetImageUrl(info.user.imageID)

        return(
            <div className={styles.header}>
                <img className={styles.userAvatar} src={imageURL} alt="avatar" />
                <div className={styles.userInfo}>
                    <div className={styles.name}>{info.user.name}</div>
                    <div className={styles.statusOnline}>{isOnline? "Online" : "Offline"}</div>
                </div>
            </div>
        )
    }else{
        return(
            <div className={styles.header}>
                <img className={styles.userAvatar} src={'/img/user.png'} />
                <span className={styles.name}>Loading</span>
                <span>loading...</span>
            </div>
        )
    }
}
