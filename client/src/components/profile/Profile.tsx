import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";

import { IMe } from "@/common/me.interface";
import { GetMe } from "@/actions/Me.actions";
import Avatar from "./ui/Avatar";
import AvatarEditorModal from "./modals/AvatarEditorModal";


export default function Profile() {
    console.log("Rendering Profile")

    const [showAvatarEditor,setShowAvatarEditor] = useState(false);

    const [me,setMe] = useState<IMe>();

    useEffect(()=>{
        GetMe().then(res=>setMe(res));
    },[]);

    const openAvatarEditor = ()=>setShowAvatarEditor(true);
    const closeAvatarEditor = ()=>setShowAvatarEditor(false);
    
    if(me){
        return(
            <div className={styles.profile}>
                <h2>My profile</h2>
                <span>ID: {me.id}</span>
                <div className={styles.maininfo}>
                    <Avatar imageID={me.imageID} onClick={openAvatarEditor}/>
                    <div className={styles.names}>
                        <span className={styles.name}>name: {me.name}</span>
                        <span className={styles.name}>surname: {me.surname}</span>
                    </div>
                </div>
                <div>
                    <button className={styles.btn_deleteMe}>Delete me</button>
                </div>

                {showAvatarEditor && <AvatarEditorModal doClose={closeAvatarEditor}/>}
            </div>
        );
    }
    else{
        return (
            <div className={styles.profile}>
                <h2>Profile is loading</h2>
                <img src='/img/user.png'/>
                <span className={styles.name}>name</span>
            </div>
        );
    }    
}
