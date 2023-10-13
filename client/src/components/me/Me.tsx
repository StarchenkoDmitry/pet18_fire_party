import styles from "./Me.module.scss";
import { useEffect, useState } from "react";
import { IMe } from "@/common/me.interface";
import { GetMe } from "@/actions/Me.actions";
import ProfileModal from "../profile/modals/ProfileModal";

export default function Me() {
    const [showProfile,setShowProfile] = useState(false);

    const [me,setMe] = useState<IMe>();

    useEffect(()=>{
        GetMe().then(res=>setMe(res));
    },[]);

    const imageURL = me && me.imageID ? 
        `http://127.0.0.1:3000/api/image/buffer/${me.imageID}` : 
        "/imgraw/3.png";

    const doCloseModal = ()=>setShowProfile(false);

    return (
        <div className={styles.me}>
        {
            me && <>
                <img className={styles.img} onClick={()=>{setShowProfile(true)}} src={imageURL}/>
                <span className={styles.name}>{me.name}</span>
            </>
        }
        { showProfile && <ProfileModal doClose={doCloseModal}/>}
        </div>
    );
}
