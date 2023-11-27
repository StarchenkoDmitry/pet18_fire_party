import axios from "axios";


//http://127.0.0.1:3000/api
export function GetBaseIP(){
    const base = window.location.hostname
    return `http://${base}:3000/api`
}

//http://127.0.0.1:3020
export function GetBaseIPSocket(){
    const base = window.location.hostname
    return `http://${base}:3020`
}



const baseURL = GetBaseIP()

const api = axios.create({
    baseURL: baseURL,
    withCredentials:true
})

export default api
