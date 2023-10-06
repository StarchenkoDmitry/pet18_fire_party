import styles from "./ContentPanel.module.scss";

import Chat from "../message/Chat";
import { useParams } from "react-router-dom";
import SelectChat from "./ui/SelectChat";


export default function ContentPanel() {
    const { id,routename } = useParams();

    return (
        <div className={styles.content}>
            {
                routename === "chat" ?
                    <Chat id={id || ""} />:<SelectChat/>
            }
        </div>
    );
}
