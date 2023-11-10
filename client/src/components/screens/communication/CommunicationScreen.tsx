import styles from "./CommunicationScreen.module.scss";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import CommunicationPanel from "@/components/communication/panels/CommunicationPanel";

import { useMe } from "@/store/Me";
import { useConnect } from "@/store/Connent";
import { useChat } from "@/store/Chat";


export default function CommunicationScreen() {
    const me = useMe();
    const chat = useChat()

    const { connect, disconnect, subConnect } = useConnect()

    useEffect(()=>{
        connect()
        
        subConnect(chat)
        subConnect(me)

        return ()=>{ disconnect() }
    },[]);

    return (
        <>
            <div className={styles.page}>
                <CommunicationPanel/>
                <Outlet/>
            </div>
        </>
        
    );
}
