import { create } from "zustand";
import { io, Socket } from "socket.io-client";



export interface IUseConnect{
    onConnect:(newSocket:Socket)=>void
    onDisconnect:()=>void
}


export interface IConnect{
    isConnected: boolean
    _socket: Socket | null

    _listeners:IUseConnect[]

    connect:()=>void
    disconnect: ()=>void

    subConnect:(ob:IUseConnect)=>void
    unnsubConnect:(ob:IUseConnect)=>void
}


export const useConnect = create<IConnect>((set, get) =>({
    isConnected:false,
    _socket: null,

    _listeners:[],

    connect:async ()=>{
        let { _socket: socket }= get();
        
        if(!socket){
            socket = io("http://127.0.0.1:3020",{
                autoConnect:false,
                withCredentials:true,
                timeout:2000,
                reconnection:true
            })

            socket.on("connect", () => {
                console.log("SOCKET: connect")
                const { _socket: socket, _listeners: _listener } = get()
                if(socket)
                _listener.forEach(s=>s.onConnect(socket))
            });

            socket.on("connect_error", () => {
                console.log("SOCKET: connect_error")
            });

            socket.on('error',(error)=>{
                console.log("SOCKET: error")
                socket?.close()
            })

            socket.on("disconnect", (reason) => {
                console.log("SOCKET: disconnect")
                const { _socket: socket, _listeners: _listener } = get()
                _listener.forEach(s=>s.onDisconnect())                
            });
        }

        console.log("Socket connecting...")
        socket.connect()
        set({ _socket: socket })
    },
    async disconnect(){
        const {_socket: socket} = get()
        if(socket){
           socket.disconnect()
           socket.close()
        }
    },
    subConnect(newListener) {
        const { _listeners, isConnected, _socket } = get()
        _listeners.push(newListener);
        if(isConnected && _socket){
            newListener.onConnect(_socket)
        }
    },
    unnsubConnect(newListener) {
        const { _listeners, isConnected,_socket: socket } = get()
        const _newlistener = _listeners.filter(lr=>lr!== newListener);
        set({_listeners:_newlistener})
        newListener.onDisconnect()
    },
}))



    
// connection:{
//     send(data){
//         const { socket } = get()
//         socket?.send(JSON.stringify(data))
//     }
// },



// connection: IConnection

// export interface IConnection{
//     send:(data:any)=>void

//     // on:(eventName:string, func:(data:any)=>void)=>void
//     // ons:(eventNames:string[], func:(eventName:string, data:any)=>void)=>void 
//     // onConnect:()=>void
//     // onDisconnect:(func:()=>void)=>void
// }