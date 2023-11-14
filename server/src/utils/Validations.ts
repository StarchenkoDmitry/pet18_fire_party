import { MAX_NAME_LENGTH, MAX_SURNAME_LENGTH } from "src/common/constants";


export function verifyName(name:string){
    if(typeof name === "string" && name.length<= MAX_NAME_LENGTH){
        return true
    }
    return false
}

export function verifySurname(surname:string){
    if(typeof surname === "string" && surname.length<= MAX_SURNAME_LENGTH){
        return true
    }
    return false
}
