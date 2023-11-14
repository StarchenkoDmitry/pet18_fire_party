export async function ConvertCanvasToDataURL(el: HTMLCanvasElement,quality:number=1){
    const dataUrl = el.toDataURL(undefined,quality)
    return dataUrl;
}

export async function ConvertDataURLToBlob(dataURL:string){
    const result = await fetch(dataURL)
    const blob = await result.blob()
    return blob;
}


// export async function ConvertCanvasToBlob(el: HTMLCanvasElement){
//     const dataUrl = el.toDataURL(undefined,1)
//     const result = await fetch(dataUrl)
//     const blob = await result.blob()
//     return blob;
// }

export async function ConvertCanvasToBlob(el: HTMLCanvasElement,quality:number=1):Promise<Blob | null>{
    return new Promise((res,rej)=>{
        el.toBlob((blob:Blob| null)=>{
            res(blob);
        },undefined,quality);
    });
}


export function ConvertBlobToStringBase64(blob:Blob):Promise<string>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
}
