import styles from "./CommunicationScreen.module.scss";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import CommunicationPanel from "@/components/communication/panels/CommunicationPanel";

import { useMe } from "@/store/Me";
import { useConnect } from "@/store/Connent";
import { useChat } from "@/store/Chat";
import { useFriendsOnline } from "@/store/FriendsOnline";


export default function CommunicationScreen() {
    // console.log("Render CommunicationScreen")

    const me = useMe.getState()
    const chat = useChat.getState()
    const friendsOnline = useFriendsOnline.getState()

    const { connect, disconnect, subConnect } = useConnect.getState()

    useEffect(()=>{
        connect()

        subConnect(chat)
        subConnect(me)
        subConnect(friendsOnline)

        return ()=>{
            // console.log("Distroed CommunicationScreen")
            disconnect()
        }
    },[]);

    return(
        <div className={styles.page}>
            <CommunicationPanel/>
            <Outlet/>
        </div>
    )
}
