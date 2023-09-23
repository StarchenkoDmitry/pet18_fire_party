import styles from "./ContentPanel.module.scss";

import Chat from "../message/Chat";


export default function ContentPanel() {
    
    return (
        <div className={styles.content}>
            <Chat/>
            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur minus facere suscipit. Soluta aliquid, blanditiis fugiat rerum inventore accusamus quibusdam. Laudantium commodi harum autem quis reprehenderit suscipit voluptas quos id.</p> */}
        </div>
    );
}
