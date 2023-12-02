export function Wait(timeWait = 2000):Promise<void>{
    return new Promise<void>((res,rej)=>{
        setTimeout(()=>{ res() }, timeWait)
    })
}
