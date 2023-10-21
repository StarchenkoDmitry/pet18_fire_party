import { Socket } from "socket.io";
import { io } from "socket.io-client";
import { create } from "zustand";

export interface IMe{
    initialied:boolean    
    socket:Socket | null
    todos:string[]

    connect:()=>void
    disconnect:()=>void

    init:()=>void
    addTodo:(text:string)=>void
}

export const useMe = create<IMe>((set, get) =>({
    initialied: false,
    socket: null,
    todos: [],

    init: () => {
    },
    connect:()=>{
        const socket = io("http://127.0.0.1:3020",{
            withCredentials:true,
        },)
        socket.on('connect',()=>{
            console.log("Socket connected.")
        })
        socket.on('error',()=>{

        })
    },
    disconnect:()=>{},
    addTodo: function (text: string): void {
        set(state=>({todos:[...state.todos,text]}))
    }
}))
