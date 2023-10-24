import styles from "./CommunicationScreen.module.scss";

import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";

import CommunicationPanel from "@/components/communication/panels/CommunicationPanel";

import { useMe } from "@/store/Me";


export default function CommunicationScreen() {
    const params = useParams();
    const me = useMe();

    useEffect(()=>{
        me.connect();
        return ()=>{me.disconnect();}
    },[]);

    useEffect(()=>{
        me.selectChat(params.id || "")
    },[params.id]);

    return (
        <div className={styles.page}>
            {/* {`${me.connected} ${JSON.stringify(me.chats)}`} */}
            <CommunicationPanel/>
            <Outlet/>
        </div>
    );
}
