import axios from "axios";


//http://127.0.0.1:3000/api


function GetBaseIP(){
    let base = window.location.hostname;
    return `http://${base}:3000/api`;
}


const baseURL = GetBaseIP();

const api = axios.create({
    baseURL: baseURL,
    withCredentials:true
});
export default api;
