import styles from "./ContentPanel.module.scss";

import { Outlet } from "react-router-dom";


export default function ContentPanel() {
    return (
        <div className={styles.content}>
            <Outlet/>
        </div>
    );
}
