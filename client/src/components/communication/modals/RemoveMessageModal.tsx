import styles from "./RemoveMessageModal.module.scss";

import { useEffect, useRef } from "react";


export interface RemoveMessageModalProps{
    toClose?: ()=>void,
    toRemoveMessage?: ()=>void,
    autoCloseTime?:number,
    cords:{x:number,y:number},
}

export default function RemoveMessageModal({
    toClose,
    toRemoveMessage,
    autoCloseTime = 750,
    cords,
}:RemoveMessageModalProps){

    const waitClose = ()=>{
        if(toClose)toClose()
    }

    const timer = useRef<any>(null)

    useEffect(()=>{
        timer.current = setTimeout(waitClose, autoCloseTime)
        return ()=>{
            if(timer.current){
                clearTimeout(timer.current)
                timer.current = null
            }
        }
    },[])

    const eventMouseEnter =()=>{
        if(timer.current){
            clearTimeout(timer.current)
            timer.current = null
        }
    }

    const eventMouseLeave =()=>{
        if(timer.current){ return }
        timer.current = setTimeout(waitClose, autoCloseTime)
    }

    const eventButtonDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        event.stopPropagation()
        if(toClose)toClose()
        if(toRemoveMessage)toRemoveMessage()
    }

    const cancelContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.stopPropagation()
        event.preventDefault()
    }

    return(
        <div 
            className={styles.messageModal}
            style={{ left:cords.x, top:cords.y }}

            onClick={cancelContextMenu}
            onContextMenu={cancelContextMenu}

            onMouseEnter={eventMouseEnter}
            onMouseLeave={eventMouseLeave}
        >
            <button 
                className={styles.btnDeleteMessage}
                onClick={eventButtonDelete}
            >
                <img className={styles.btnDeleteMessage_img} src="/icon/trash.png" alt="trash" />
                <span className={styles.btnDeleteMessage_text}>remove a message</span>
            </button>
        </div>
    )
}
