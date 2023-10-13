import api from "@/api/api";
import { IMeChats, IMessage, IUser } from "@/common/interfaces";


export async function CreateChat(friend_id:string):Promise<boolean>{
    try {
        const res = await api.post("chat/create",{id:friend_id});
        console.log("/chat/create res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action CreateChat error: ",error);
        return false;
    }
}

export async function SendMessage(chatid:string,message:string):Promise<boolean>{
    try {
        const res = await api.post("chat/createmessage",{
            id:chatid,
            message:message
        });
        console.log("/chat/createmessage res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action SendMessage error: ",error);
        return false;
    }
}


export async function GetAllMessage(chatid:string):Promise<IMessage[] | undefined>{
    try {
        const res = await api.get(`chat/messages/${chatid}`);
        console.log("/chat/messages/:chatid res: ",res.data)
        if(res.status === 200){
            return res.data;
        }else return undefined;
    } catch (error) {
        console.log("Action GetAllMessage error: ",error);
        return undefined;
    }
}


export async function GetMeChats():Promise<IMeChats | undefined>{
    // const controller = new AbortController();
    // {signal: controller.signal}
    try {
        const res = await api.get('chat/me');
        console.log("chat/me res: ", res.data);
        if(res.status === 200){
            return res.data;
        }else return undefined;
    } catch (error) {
        console.log("Action GetMeChats error: ",error);
        return undefined;
    }
}


export async function DeleteMessage(id:string):Promise<boolean>{
    try {
        const res = await api.delete(`chat/message/${id}`);
        console.log("/chat/message/:id res: ",res.data)
        if(res.status ===200){            
            return res.data;
        }else{
            return false;
        }
    } catch (error) {
        console.log("Action GetImage error: ",error);
        return false;
    }
}

export async function FindAllByName(text:string,stoper?:AbortController):Promise<IUser[] | undefined>{
    try {
        const res = await api.get(`user/findAllByName/${text}`,{
            signal: stoper ? stoper.signal : undefined
        });
        console.log(`user/findAllByName/(text:${text}) res: `, res.data);
        if(res.status === 200){
            return res.data;
        }else return undefined;
    } catch (error) {
        console.log("Action FindAllByName error: ",error);
        return undefined;
    }
}
