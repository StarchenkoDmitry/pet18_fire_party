import styles from "./Main.module.scss"

import CommunicationsPanel from "@/components/panels/CommunicationsPanel";
import ContentPanel from "@/components/panels/ContentPanel";


export default function Main() {
    return (
        <div className={styles.page}>
            <CommunicationsPanel/>
            <ContentPanel/>
        </div>
    );
}
