import api from "@/api/api";
import { IUser } from "@/common/user.interface";

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
