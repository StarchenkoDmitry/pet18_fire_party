import api from "@/api/api";


export interface SignUpData{
    name:string
    surname:string
    login:string
    email:string
    password:string
}

export async function signup(data:SignUpData):Promise<boolean>{
    try {
        const res = await api.post("auth/register",data);
        console.log("/auth/register res: ",res.data)
        return res.status === 201;
    } catch (error) {
        console.log("Action Register error: ",error);
        return false;
    }
}
