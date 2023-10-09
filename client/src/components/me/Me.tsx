import styles from "./Me.module.scss";
import { useEffect, useState } from "react";
import { IMe } from "@/common/me.interface";
import { GetMe } from "@/actions/Me.actions";
import { Link } from "react-router-dom";

export default function Me() {
    const [me,setMe] = useState<IMe>();
    console.log("ME: ",me)

    useEffect(()=>{
        GetMe().then(res=>setMe(res));
    },[]);

    const imageURL = me && me.imageID ? 
        `http://127.0.0.1:3000/api/image/buffer/${me.imageID}` : 
        "/imgraw/3.png";

    return (
        <div className={styles.me}>
        {
            me && <>
                <Link to={"/profile"}>
                    <img src={imageURL}/>
                </Link>
                <span className={styles.name}>{me.name}</span>
            </>
        }
        </div>
    );
}
