import api from "@/api/api";
import { RandomEmail } from "@/utils/Randomer";


interface RegisterData{
    login:string;
    email:string;
    password:string;
}

export async function Register(data:RegisterData):Promise<boolean>{
    try {
        const res = await api.post("auth/register",data);
        console.log("@register res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action Register error: ",error);
        return false;
    }
}


export async function CreateChat(friend_pubid:string):Promise<boolean>{
    try {
        const res = await api.post("chat/create",{pubid:friend_pubid});
        console.log("#chat create res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action CreateChat error: ",error);
        return false;
    }
}

