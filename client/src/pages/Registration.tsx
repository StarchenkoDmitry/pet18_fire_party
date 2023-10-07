import Authorization from "@/components/screens/Authorization";
import styles from "./Registration.module.scss"
import Header from "@/components/header/Header";



export default function Registration() {
  return (
    <div className={styles.page}>
      <Header/>
      <Authorization/>
    </div>
  );
}
