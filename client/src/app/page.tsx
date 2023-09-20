import Header from "@/components/header/Header";

import styles from "./page.module.scss"

export default function Main() {
  console.log("Render Main");
  return (
    <div>
      <Header/>
      <div className={styles.container}>

      </div>
    </div>
  );
}

