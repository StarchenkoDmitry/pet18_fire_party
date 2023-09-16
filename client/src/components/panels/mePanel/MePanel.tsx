import ChatsList from "./ChatsList";
import styles from "./MePanel.module.scss";

export default function MePanel() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.me_panel}>
                <ChatsList></ChatsList>
            </div>
        </div>
    );
}
