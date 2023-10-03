import api from "@/api/api";
import { Message } from "@/common/inerfaces";
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

export async function SendMessage(chat_pubid:string,message:string):Promise<boolean>{
    try {
        const res = await api.post("chat/createmessage",{
            pubid:chat_pubid,
            message:message
        });
        console.log("#chat createmessage res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action SendMessage error: ",error);
        return false;
    }
}


export async function GetAllMessage(chat_pubid:string):Promise<Message[] | undefined>{
    try {
        const res = await api.get(`chat/getmessages/${chat_pubid}`);
        console.log("#chat getmessages res: ",res.data)
        if(res.status === 200){
            return res.data;
        }else return undefined;
    } catch (error) {
        console.log("Action GetAllMessage error: ",error);
        return undefined;
    }
}

