export function Wait():Promise<void>{
    return new Promise<void>((res,rej)=>{
        setTimeout(()=>{
            res();
        },2000);
    });
}
