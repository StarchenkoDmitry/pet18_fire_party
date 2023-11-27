import styles from "./MessageBox.module.scss";

import { useState } from "react";

import { IMessage } from "@/common/chat.interface";
import { convertToStringDate } from "@/utils/Date";

import RemoveMessageModal from "@/components/communication/modals/RemoveMessageModal";


const MOUSE_RIGHT = 2

export interface MessageProps{
    message: IMessage;
    toRemove?: ()=>void;
}

export default function MessageBox({message,toRemove}:MessageProps) {

    const [showEditModal,setShowEditModal] = useState(false)
    const [cordsModal,setCordsModal] = useState({x:0,y:0})

    const createAt = convertToStringDate(message.createAt)

    const eventClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if(event.button === MOUSE_RIGHT){
            event.preventDefault()
            setShowEditModal(true)
            setCordsModal({
                x:event.clientX,
                y:event.clientY,
            })
        }
    }

    const closeModal = ()=>{
        setShowEditModal(false)
    }

    return (
        <div className={styles.message} onContextMenu={eventClick}>
            {/* <div className={styles.message_head}>
                <button onClick={toRemove}>Delete</button>
            </div> */}
            <p className={styles.message_text}>
                {message.text}
                <span className={styles.message_createAt1}>{createAt}</span>
                <span className={styles.message_createAt2}>{createAt}</span>
            </p>
            {
                showEditModal && 
                <RemoveMessageModal 
                    toRemoveMessage={toRemove}
                    toClose={closeModal}
                    cords={cordsModal}
                />
            }
        </div>
    )
}
