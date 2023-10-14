import styles from "./CommunicationScreen.module.scss";

import CommunicationsPanel from "@/components/communication/panels/CommunicationsPanel";
import { Outlet } from "react-router-dom";


export default function CommunicationScreen() {
    
    return (
        <div className={styles.page}>
            <CommunicationsPanel/>
            <Outlet/>
        </div>
    );
}