export async function CreateBlobFromCanvas(el: HTMLCanvasElement){
    const dataUrl = el.toDataURL(undefined,1)
    const result = await fetch(dataUrl)
    const blob = await result.blob()
    return blob;
}
