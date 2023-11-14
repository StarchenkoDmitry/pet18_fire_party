import styles from "./Me.module.scss";

import { useState } from "react";

import ProfileModal from "../profile/modals/ProfileModal";
import { useMe } from "@/store/Me";


export default function Me() {
    const [showProfile,setShowProfile] = useState(false)

    const me = useMe(state=>state.me)
    
    const closeProfile = ()=>setShowProfile(false)
    const openProfile = ()=>{setShowProfile(true)}

    if(me){
        const imageURL = !me.imageID ? "/img/user.png" : 
        `http://${window.location.hostname}:3000/api/image/buffer/${me.imageID}`
        
        return (
            <div className={styles.me}>
                <img className={styles.meAvatar} src={imageURL} onClick={openProfile}/>
                <span className={styles.name}>{me.name}</span>
                { showProfile && <ProfileModal doClose={closeProfile}/>}                
                <img className={styles.setting} src="/img/gear96.png"/>
            </div>
        )
    }else{
        return(
            <div className={styles.me}>
                <img className={styles.meAvatar} src={'/img/user.png'} onClick={openProfile}/>
            </div>
        )
    }    
}
