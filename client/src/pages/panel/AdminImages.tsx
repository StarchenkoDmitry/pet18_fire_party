import { useEffect, useState } from "react";
import styles from "./AdminImages.module.scss"
import api from "@/api/api";

export default function AdminImages() {
    const [ids,setIDs] = useState<string[]>([]);

    useEffect(()=>{
        GetImagesID().then((res)=>{
            setIDs(res);
        });
    },[]);

    return (
        <div className={styles.page}>
           {
            ids && ids.map((e,i)=><div key={i}>
                <span>{e}</span>
                <img className={styles.img} src={`http://127.0.0.1:3000/api/image/buffer/${e}`} />
            </div>)
           }
        </div>
    );
}

export async function GetImagesID() {
    try {
        const res = await api.get("image/allid");
        console.log("res: ",res.data)
        if(res.status === 200){
            return res.data;
        }else return [];
    } catch (error) {
        console.log("Error: ",error)
    }
}
