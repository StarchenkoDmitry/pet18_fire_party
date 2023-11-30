import styles from "./AdminImages.module.scss"

import { useEffect, useState } from "react";

import { GetBaseIP } from "@/api/api";
import { GetAllImageID } from "@/actions/Image.actions";


export default function AdminImages() {
    const [ids,setIDs] = useState<string[]>([])

    useEffect(()=>{
        GetAllImageID().then((res)=>{
            setIDs(res)
        })
    },[])

    return (
        <div className={styles.page}>
           {
            ids && ids.map((e,i)=><div key={i}>
                <div>{e}</div>
                <img className={styles.img} src={`${GetBaseIP()}/image/buffer/${e}`} />
            </div>)
           }
        </div>
    )
}
