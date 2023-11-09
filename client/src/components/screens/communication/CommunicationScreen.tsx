import styles from "./CommunicationScreen.module.scss";

import { Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";

import CommunicationPanel from "@/components/communication/panels/CommunicationPanel";

import { useMe } from "@/store/Me";
import { useConnect } from "@/store/Connent";
import { useChat } from "@/store/Chat";


export default function CommunicationScreen() {
    // const { id } = useParams();
    const me = useMe();
    const chat = useChat()

    const { connect, disconnect, subConnect,unnsubConnect } = useConnect()

    useEffect(()=>{
        connect()
        
        subConnect(chat)
        subConnect(me)
        // me.init(connection)
        // chat.init(connection)

        return ()=>disconnect()
    },[]);

    return (
        <>
            {/* <div>TEST</div> */}
            <div className={styles.page}>
                {/* {`${me.connected} ${JSON.stringify(me.chats)}`} */}                
                <CommunicationPanel/>
                <Outlet/>
            </div>
        </>
        
    );
}




// useEffect(()=>{
//     me.selectChat(id || "")
// },[id]);