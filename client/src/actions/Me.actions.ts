import api from "@/api/api";
import { IMe } from "@/common/me.interface";

export async function GetMe():Promise<IMe|undefined> {
    try {
        const res = await api.get("user/me");
        return res.status === 200? res.data : undefined;
    } catch (error) {
        console.log("GetMe() error: ",error)
        return;
    }
}
