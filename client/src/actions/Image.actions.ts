import api from "@/api/api";

export async function GetImage(id:string):Promise<any>{
    try {
        const res = await api.get(`image/${id}`);
        console.log("/image/:id res: ",res.data)
        if(res.status === 200){
            return res.data;
        }
        else return undefined;
    } catch (error) {
        console.log("Action GetImage error: ",error);
        return undefined;
    }
}

export async function UpdateImage(id:string,blob:Blob) {
    try
    {
        const formData = new FormData();
        formData.append("file", blob);

        const res = await api.post(`image/update/${id}`,formData,{
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        // console.log("image/update/:id res: ",res.data)

        if(res.status === 201){
            return res.data;
        }
        else return;
    } catch (error) {
        console.log("Error: ",error)
    }
}


export async function GetMyAvatarImage():Promise<Blob | undefined>{
    try {
        const res = await api.get("image/myavatarblob",{
            responseType:"blob",
        });
        console.log("GetMyAvatarImage res:",res)

        return res.status === 200 ? res.data : undefined;
    } catch (error) {
        console.log("GetMyAvatar error: ",error)
        return;
    }
}


// export async function SetMyAvatarImageFromDataURL(dataURL:string):Promise<boolean> {
    

//     return false;
// }


export async function SetMyAvatarImageFromBlob(blob:Blob):Promise<boolean> {
    

    return false;
}