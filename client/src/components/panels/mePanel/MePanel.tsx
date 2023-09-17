import ChatsList from "./ChatsList";
import styles from "./MePanel.module.scss";

export default function MePanel() {
    return (
        <div className={styles.me_panel+ " fireui_scrollbar_novisibl"}>
            <ChatsList></ChatsList>
        </div>
    );
}
