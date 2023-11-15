export function GetImageUrl(imageId?:string | null){
    const imageURL = imageId ? 
    `http://${window.location.hostname}:3000/api/image/buffer/${imageId}` : 
    "/img/user.png"
    return imageURL
}
