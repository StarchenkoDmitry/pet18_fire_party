import styles from "./ContentPanel.module.scss";

import Chat from "../message/Chat";
import { useParams } from "react-router-dom";


export default function ContentPanel() {
    const { pubid,routename } = useParams();
    return (
        <div className={styles.content}>
        <div>{pubid} {routename}</div>
            <Chat/>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur minus facere suscipit. Soluta aliquid, blanditiis fugiat rerum inventore accusamus quibusdam. Laudantium commodi harum autem quis reprehenderit suscipit voluptas quos id.</p> */}
        </div>
    );
}
