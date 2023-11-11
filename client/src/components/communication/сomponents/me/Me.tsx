import styles from "./Me.module.scss";

import { useEffect, useState } from "react";

import { GetMe } from "@/actions/Me.actions";

import ProfileModal from "../profile/modals/ProfileModal";
import { IUserForMe } from "@/common/user.interface";

export default function Me() {
    const [showProfile,setShowProfile] = useState(false);

    const [me,setMe] = useState<IUserForMe>();

    useEffect(()=>{
        GetMe().then(res=>setMe(res));
    },[]);
    
    const closeModal = ()=>setShowProfile(false);
    const openModal = ()=>{setShowProfile(true)};

    if(me){
        const imageURL = !me.imageID ? "/img/user.png" : 
        `http://${window.location.hostname}:3000/api/image/buffer/${me.imageID}`;
        
        return (
            <div className={styles.me}>
                <img className={styles.meAvatar} src={imageURL} onClick={openModal}/>
                <span className={styles.name}>{me.name}</span>
                { showProfile && <ProfileModal doClose={closeModal}/>}
            </div>
        );
    }else{
        return(<div>
            <img className={styles.meAvatar} src={'/img/user.png'} onClick={openModal}/>
        </div>);
    }
    
}
