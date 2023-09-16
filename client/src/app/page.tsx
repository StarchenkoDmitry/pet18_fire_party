import MainSidePanel from "@/components/panels/mainSidePanel/MainSidePanel";
import styles from  "./page.module.scss";

import MainLayout from "@/components/layout/MainLayout";
import MePanel from "@/components/panels/mePanel/MePanel";


export default function Main() {
  console.log("testrender.");
  return (
    <MainLayout>
      <div className={styles.main_container}>
        <MainSidePanel/>
        <MePanel/>
        <div>fdfdf</div>
      </div>
    </MainLayout>
  );
}