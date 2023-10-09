import styles from "./AddChatModal.module.scss";


export interface ProfileModalProps{
    doClose?:()=>void;
}

export default function ProfileModal({doClose}:ProfileModalProps) {
    

    return (
        <div className={styles.modal} onClick={doClose}>
            Test ProfileModal
        </div>
    )
}
