import styles from "./ProfileModal.module.scss";

import Profile from "../../ui/profile/Profile";


export interface ProfileModalProps{
    doClose?:()=>void;
}

export default function ProfileModal({doClose}:ProfileModalProps) {

    const eventStopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.stopPropagation()
    }

    return (
        <div className={styles.modal} onClick={doClose}>
            <div onClick={eventStopPropagation}>
                <Profile/>
            </div>
        </div>
    )
}
