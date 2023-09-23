import api from "@/api/api";


interface RegisterData{
    login:string;
    email:string;
    password:string;    
}

export async function Register(data:RegisterData):Promise<boolean>{
    try {
        const res = await api.post("auth/register",data);
        return res.status === 201;
    } catch (error) {
        console.log("Action Register error: ",error);
        return false;
    }
}
