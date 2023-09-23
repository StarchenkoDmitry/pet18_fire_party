import Authorization from "@/components/screens/Authorization";
import styles from "./page.module.scss"
import MainScreen from "@/components/screens/MainScreen";
import Header from "@/components/header/Header";



export default async function Main() {
  return (
    <div className={styles.page}>
      <Header/>
      <Authorization/>
    </div>
  );
}

