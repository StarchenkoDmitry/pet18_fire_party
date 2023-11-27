/**
 * @param dataStr string | Date
 * @returns string "hh:mm"
 */
export function convertToStringDate(dataStr:string | Date):string{
    const data = typeof dataStr === "string" ? new Date(dataStr) : dataStr
    const createAt = [data.getHours(), data.getMinutes()].map((x)=>{
        return x < 10 ? "0" + x : x
    }).join(":")
    return createAt
}
