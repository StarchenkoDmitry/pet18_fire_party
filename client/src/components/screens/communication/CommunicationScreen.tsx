import styles from "./CommunicationScreen.module.scss";

import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";

import CommunicationPanel from "@/components/communication/panels/CommunicationPanel";

import { useMe } from "@/store/Me";
import { useConnect } from "@/store/Connent";
import { useChat } from "@/store/Chat";
import { useFriendsOnline } from "@/store/FriendsOnline";


export default function CommunicationScreen() {
    console.log("Render CommunicationScreen")
    // const refff = useRef<any>()

    const me = useMe()
    const chat = useChat()
    const friendsOnline = useFriendsOnline()

    const { connect, disconnect, subConnect } = useConnect()

    // console.log("TEST ", refff.current === chat,refff.current,chat)
    // console.log("TEST ", refff.current === chat)
    // refff.current = chat

    useEffect(()=>{
        connect()
        
        subConnect(chat)
        subConnect(me)
        subConnect(friendsOnline)

        return ()=>{
            console.log("Distroed CommunicationScreen")
            disconnect()
        }
    },[]);

    return (
        <>
            <div className={styles.page}>
                <CommunicationPanel/>
                <Outlet/>
            </div>
        </>
        
    )
}
