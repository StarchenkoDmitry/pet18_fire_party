import api from "@/api/api";
import { IMe, IMeChats } from "@/common/me.interface";

export async function GetMe():Promise<IMe|undefined> {
    try {
        const res = await api.get("user/me");
        return res.status === 200? res.data : undefined;
    } catch (error) {
        console.log("GetMe() error: ",error)
        return;
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
