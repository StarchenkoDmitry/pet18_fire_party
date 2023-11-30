import { GetBaseIP } from "@/api/api"

export function GetImageUrl(imageId?:string | null):string{
    const imageURL = imageId ? 
    `${GetBaseIP()}/image/buffer/${imageId}` : 
    "/img/user.png"
    return imageURL
}
