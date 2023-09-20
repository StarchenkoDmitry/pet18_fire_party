'use client'
import styles from "./MainScreen.module.scss";
import ChatsPanel from "../panels/ChatsPanel";
import ContentPanel from "../panels/ContentPanel";
// import { useParams } from 'next/navigation'

export default function MainScreen() {
    
    return (
        <div className={styles.container}>
            <ChatsPanel/>
            <ContentPanel/>
        </div>       
    )
}