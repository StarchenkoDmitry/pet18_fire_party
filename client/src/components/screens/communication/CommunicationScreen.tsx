import styles from "./CommunicationScreen.module.scss";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import CommunicationPanel from "@/components/communication/panels/CommunicationPanel";

import { useMe } from "@/store/Me";


export default function CommunicationScreen() {    
    const me = useMe();

    useEffect(()=>{
        me.connect();
        return ()=>{me.disconnect();}
    },[]);

    return (
        <div className={styles.page}>
            <CommunicationPanel/>
            <Outlet/>
        </div>
    );
}
