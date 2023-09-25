import Authorization from "@/components/screens/Authorization";
import styles from "./Home.module.scss"
import MainScreen from "@/components/screens/MainScreen";
import Header from "@/components/header/Header";



export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <Authorization/>
    </div>
  );
}

