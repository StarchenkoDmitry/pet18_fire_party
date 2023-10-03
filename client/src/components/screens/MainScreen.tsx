'use client'
import styles from "./MainScreen.module.scss";
import ContentPanel from "../panels/ContentPanel";
import CommunicationsPanel from "../panels/CommunicationsPanel";
// import { useParams } from 'next/navigation'

export default function MainScreen() {
    
    return (
        <div className={styles.container}>
            <CommunicationsPanel/>
            <ContentPanel/>
        </div>       
    )
}