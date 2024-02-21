import axios from "axios";

//http://127.0.0.1:3000/api
export function GetBaseIP() {
    const base = window.location.hostname;
    return `https://${base}:3000/api`;
}

//wss://127.0.0.1:3000
export function GetBaseIPSocket() {
    const base = window.location.hostname;
    return `wss://${base}:3000`;
}

const api = axios.create({
    baseURL: GetBaseIP(),
    withCredentials: true,
});

export default api;
