import { cookies } from "next/headers";


export function IsExistSession():boolean{
    const res = cookies().get("session");
    console.log(`Coolie [Session]=${res}`);
    return res !== undefined;
}