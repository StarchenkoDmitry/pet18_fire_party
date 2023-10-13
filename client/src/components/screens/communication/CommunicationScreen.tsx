import styles from "./CommunicationScreen.module.scss";

import ContentPanel from "@/components/communication/panels/ContentPanel";
import CommunicationsPanel from "@/components/communication/panels/CommunicationsPanel";


export default function CommunicationScreen() {
    
    return (
        <div className={styles.page}>
            <CommunicationsPanel/>
            <ContentPanel/>
        </div>
    );
}