import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";

import { IMe } from "@/common/me.interface";
import { GetMe } from "@/actions/Me.actions";
import Avatar from "./ui/Avatar";
import AvatarEditorModal from "./modals/AvatarEditorModal";
import axios from "axios";
import { ConvertBlobToStringBase64 } from "@/utils/Convert";
import { GetMyAvatarImage } from "@/actions/Image.actions";



const url = "http://127.0.0.1:3000/api/image/buffer/";


export default function Profile() {
    console.log("Rendering Profile")

    const [showAvatarEditor,setShowAvatarEditor] = useState(false);

    const [me,setMe] = useState<IMe>();

    useEffect(()=>{
        GetMe().then(res=>setMe(res));
    },[]);

    const openAvatarEditor = ()=>setShowAvatarEditor(true);
    const closeAvatarEditor = ()=>setShowAvatarEditor(false);

    const getMyImage = async ():Promise<string | undefined>=>{
        const blob = await GetMyAvatarImage();
        if(!blob) return;        
        const imageDataURL = await ConvertBlobToStringBase64(blob)
        return imageDataURL;
    }
  
    const setMyImage =async (dataURL:string):Promise<boolean> => {
        const blob = Conv
        return false;
    }

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

                {showAvatarEditor && <AvatarEditorModal loadImage={getMyImage} saveImage={} doClose={closeAvatarEditor}/>}
            </div>
        );
    }
    else{
        //PROFILE_SKELETE
        return (
            <div className={styles.profile}>
                <h2>My profile</h2>
                <span>ID: 1234####-####-####-1234-####1234####</span>
                <div className={styles.maininfo}>
                    <img className={styles.skelete_img} src='/img/user.png'/>
                    <div className={styles.names}>
                        <span className={styles.name}>name: Duck</span>
                        <span className={styles.name}>surname: Omutovich</span>
                    </div>
                </div>
                <div>
                    <button className={styles.btn_deleteMe}>Delete me</button>
                </div>
            </div>
        );
    }    
}
