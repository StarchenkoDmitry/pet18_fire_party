import styles from "./ContentPanel.module.scss";

import Chat from "../message/Chat";
import { useParams } from "react-router-dom";


export default function ContentPanel() {
    const { id,routename } = useParams();

    return (
        <div className={styles.content}>
            {/* <div>{pubid} {routename}</div> */}
            {
                routename === "chat" ?
                    <Chat id={id || ""} />
                    :<div>HZ</div>
            }
        </div>
    );
}
