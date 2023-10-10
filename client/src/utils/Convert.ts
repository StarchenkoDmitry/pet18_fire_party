export async function CreateDataURLFromCanvas(el: HTMLCanvasElement,quality:number=1){
    const dataUrl = el.toDataURL(undefined,quality)
    return dataUrl;
}


export async function CreateBlobFromCanvas(el: HTMLCanvasElement){
    const dataUrl = el.toDataURL(undefined,1)
    const result = await fetch(dataUrl)
    const blob = await result.blob()
    return blob;
}


export function ConvertBlobToBase64(blob:Blob):Promise<string>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
}