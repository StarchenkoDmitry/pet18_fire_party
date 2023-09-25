import { useEffect, useState } from "react";
import styles from "./Admin.module.scss"
import api from "@/api/api";

export default function Admin() {
    const [loading,set_loading]= useState(true);
    const [users,set_users] = useState<User[]|undefined>(undefined);

    useEffect(()=>{

        GetAllUsers().then((res)=>{
            set_users(res);
        });

    },[]);

    return (
        <div className={styles.page}>
            <div className="">
                ADMIN PANEL
            </div>
            <div>
            {
                users?.map((e,i)=><div key={i}>
                    <div>{e.login}</div>
                    <div>{e.email}</div>
                </div>)
            }
            </div>
            
        </div>
    );
}

interface User{
    login:string;
    passwordHash:string;
    email:string;

    token?:string;

    name?:string;
    surname?:string;
}

async function GetAllUsers():Promise<User[] | undefined> {
    try {
        const res = await api.get("user");
        if(res.status === 200){
            console.log(res.data);
            return res.data;
        }else return;
    } catch (error) {
        
    }
}