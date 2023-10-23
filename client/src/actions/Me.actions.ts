import api from "@/api/api";
import { IMe, IMyChat } from "@/common/me.interface";

export async function GetMe():Promise<IMe|undefined> {
    try {
        const res = await api.get("user/me");
        if(res.status === 200){
            return res.data;
        }
    } catch (error) {
        console.log("GetMe() error: ",error)
    }
}

export async function GetMyChats():Promise<IMyChat[] | undefined>{
    try {
        const res = await api.get('chat/me');
        // console.log("chat/me res: ", res.data);
        if(res.status === 200){
            return res.data;
        }
    } catch (error) {
        console.log("Action GetMeChats error: ",error);
    }
}
