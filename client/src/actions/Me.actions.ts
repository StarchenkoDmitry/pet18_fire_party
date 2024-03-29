import api from "@/api/api";
import { IChatWithUser } from "@/common/chat.interface";
import { IUserForMe } from "@/common/user.interface";

export async function GetMe(): Promise<IUserForMe | undefined> {
    try {
        const res = await api.get("user/me");
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("GetMe() error: ", error);
    }
}

export async function GetMyChats(): Promise<IChatWithUser[] | undefined> {
    try {
        const res = await api.get("chat/my");
        // console.log("chat/me res: ", res.data);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("Action GetMeChats error: ", error);
    }
}
