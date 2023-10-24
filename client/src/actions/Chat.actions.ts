import api from "@/api/api";
import { IMessage } from "@/common/chat.interface";
import { IMyChat } from "@/common/me.interface";

export async function CreateChat(friend_id:string):Promise<boolean>{
    try {
        const res = await api.post("chat/create",{id:friend_id});
        // console.log("/chat/create res: ",res.data)
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
        // console.log("/chat/createmessage res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action SendMessage error: ",error);
        return false;
    }
}

export async function DeleteMessage(id:string):Promise<boolean>{
    try {
        const res = await api.delete(`chat/message/${id}`);
        // console.log("/chat/message/:id res: ",res.data)
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

export async function GetAllMessage(chatid:string,stoper?:AbortController):Promise<IMessage[] | undefined>{
    try {
        const res = await api.get(`chat/messages/${chatid}`,{
            signal: stoper? stoper.signal: undefined
        });
        // console.log("/chat/messages/:chatid res: ",res.data)        
        return res.status === 200 ? res.data : undefined;
    } catch (error) {
        console.log("Action GetAllMessage error: ",error);
        return undefined;
    }
}

export async function GetChatInfo(chatid:string,stoper?:AbortController):Promise<IMyChat | undefined>{
    try {
        const res = await api.get(`chat/my/${chatid}`,{
            signal: stoper? stoper.signal : undefined
        });
        // console.log(`chat/my/${chatid}`, res.data);        
        return res.status === 200 ? res.data : undefined;
    } catch (error) {
        console.log("Action GetChatInfo error: ",error);
        return undefined;
    }
}
