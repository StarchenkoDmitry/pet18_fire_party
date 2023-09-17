import MainSidePanel from "@/components/panels/mainSidePanel/MainSidePanel";
import styles from  "./page.module.scss";

import MainLayout from "@/components/layout/MainLayout";
import MePanel from "@/components/panels/mePanel/MePanel";
import Chat from "@/components/panels/mePanel/Chat/Chat";


export default function Main() {
  console.log("testrender.");
  return (
    <MainLayout>
      <div className={styles.main_container}>
        <MainSidePanel/>
        <MePanel/>
        <Chat/>
        <div className={styles.test1}>
          
          <div>fdfdf</div>
          <div>fdfdf</div>
          <div>fdfdtyrtyrtyf</div>
          <div>fdfdf</div>
          <div>fdfdf</div>
          <div>fdfdf</div>
        </div>
      </div>
    </MainLayout>
  );
}