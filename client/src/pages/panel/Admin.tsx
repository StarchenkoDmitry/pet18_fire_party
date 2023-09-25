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
            <table className={styles.table_users}>
                <tr>
                    <th scope="col">Login</th>
                    <th scope="col">Email</th>
                </tr>
                {
                    users?.map((e,i)=><tr key={i}>
                        <td>{e.login}</td>
                        <td>{e.email}</td>
                    </tr>)
                }
            </table>
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
