import styles from "./MainSidePanel.module.scss";



export default function MainSidePanel() {

    

    return (
        <div className={styles.wrapper}>
            <div className={styles.main_side_panel}>
                <img className={styles.img} src="/imgraw/1.jpg" alt="" />
                <img className={styles.img} src="/imgraw/2.jpg" alt="" />
                <img className={styles.img} src="/imgraw/3.jpg" alt="" />
            </div>
        </div>
    );
}
