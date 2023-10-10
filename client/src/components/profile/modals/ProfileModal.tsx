import styles from "./ProfileModal.module.scss";

import Profile from "../Profile";



export interface ProfileModalProps{
    doClose?:()=>void;
}

export default function ProfileModal({doClose}:ProfileModalProps) {
    

    return (
        <div className={styles.modal} onClick={doClose}>
            <div onClick={(e)=>e.stopPropagation()}>
                <Profile/>
            </div>
        </div>
    )
}
