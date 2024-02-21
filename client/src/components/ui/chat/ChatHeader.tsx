import styles from "./ChatHeader.module.scss";
import { GetImageUrl } from "@/utils/Image";
import { useChat } from "@/store/Chat";
import { useOnlineFriends } from "@/store/OnlineFriends";

export default function ChatHeader() {
    const info = useChat((state) => state.info);
    const onlines = useOnlineFriends((state) => state.onlines);

    if (info) {
        const isOnline = onlines.includes(info.user.id);
        const imageURL = GetImageUrl(info.user.imageID);

        return (
            <div className={styles.header}>
                <img className={styles.userAvatar} src={imageURL} alt="user avatar" />
                <div className={styles.userInfo}>
                    <div className={styles.name}>{info.user.name}</div>
                    <div className={styles.statusOnline}>{isOnline ? "Online" : "Offline"}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.header}>
                <img
                    className={styles.userAvatar}
                    src={"/img/user.png"}
                    alt="user avatar"
                    data-loading={true}
                />
                <div className={styles.userInfo}>
                    <div className={styles.name} data-loading={true}>
                        loading
                    </div>
                    <div className={styles.statusOnline} data-loading={true}>
                        status
                    </div>
                </div>
            </div>
        );
    }
}
