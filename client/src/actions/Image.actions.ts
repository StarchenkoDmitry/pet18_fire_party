import api from "@/api/api";

//вродебы depricated
// export async function GetImage(id:string):Promise<any>{
//     try {
//         const res = await api.get(`image/${id}`);
//         console.log("/image/:id res: ",res.data)
//         if(res.status === 200){
//             return res.data;
//         }
//         else return undefined;
//     } catch (error) {
//         console.log("Action GetImage error: ",error);
//         return undefined;
//     }
// }

//вродебы depricated
export async function UpdateImage(id: string, blob: Blob) {
    try {
        const formData = new FormData();
        formData.append("file", blob);

        const res = await api.post(`image/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        // console.log("image/update/:id res: ",res.data)

        if (res.status === 201) {
            return res.data;
        } else return;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export async function GetMyAvatar(): Promise<Blob | undefined> {
    try {
        const res = await api.get("user/avatarBlob", {
            responseType: "blob",
        });
        console.log("GetMyAvatarImage res:", res);
        return res.status === 200 ? res.data : undefined;
    } catch (error) {
        console.log("GetMyAvatar error: ", error);
        return;
    }
}

export async function SetMyAvatar(blob: Blob): Promise<boolean> {
    try {
        const formData = new FormData();
        formData.append("file", blob);

        const res = await api.post("user/avatarBlob", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("SetMyAvatar res:", res);

        return res.status === 201 ? res.data : false;
    } catch (error) {
        console.log("SetMyAvatar error: ", error);
        return false;
    }
}

export async function GetAllImageID() {
    try {
        const res = await api.get("image/allid");
        console.log("res: ", res.data);
        if (res.status === 200) {
            return res.data;
        } else return [];
    } catch (error) {
        console.log("Error: ", error);
    }
}
