import styles from "./Main.module.scss"
import MainScreen from "@/components/screens/MainScreen";



export default function Main() {


    return (
        <div className={styles.page}>
            <MainScreen />
        </div>
    );
}

