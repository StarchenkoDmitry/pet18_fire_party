import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { GetBaseIPSocket } from "@/api/api";
import { Logged } from "@/actions/Auth.actions";

export interface IUseConnect {
    onConnect: (newSocket: Socket) => void;
    onDisconnect: () => void;
}

export interface IConnect {
    isConnected: boolean;
    _socket: Socket | null;

    _subscribers: IUseConnect[];

    connect: () => void;
    disconnect: () => void;

    subConnect: (newSub: IUseConnect) => void;
    unsubConnect: (oldSub: IUseConnect) => void;
}

export const useConnect = create<IConnect>((set, get) => ({
    isConnected: false,
    _socket: null,

    _subscribers: [],

    connect: async () => {
        let { _socket } = get();

        if (!_socket) {

            const isLogged = await Logged();
            if(!isLogged){
                window.location.replace("/register");
                return;
            }

            _socket = io(GetBaseIPSocket(), {
                autoConnect: false,
                withCredentials: true,
                timeout: 2000,
                reconnection: true,
            });
            set({ _socket: _socket });
            _socket.on("connect", () => {
                console.log("SOCKET: connect");
                set({ isConnected: true });
                const { _socket, _subscribers } = get();
                if (_socket) _subscribers.forEach((s) => s.onConnect(_socket));
            });

            _socket.on("connect_error", (error) => {
                console.log("SOCKET connect_error:", error.message);
            });

            _socket.on("error", (error) => {
                console.log("SOCKET error:", error.message);
                // UnsubscribeAll()
                // _socket?.disconnect()
                _socket?.close();
            });

            _socket.on("disconnect", (reason) => {
                console.log("SOCKET disconnect:", reason);
                set({ isConnected: false });
                const { _subscribers } = get();
                _subscribers.forEach((s) => s.onDisconnect());
            });
        }

        console.log("Socket connecting...");
        _socket.connect();
    },
    async disconnect() {
        const { _socket } = get();
        if (_socket) {
            _socket.disconnect();
            _socket.close();
        }
    },
    subConnect(newSub) {
        const { _subscribers, isConnected, _socket } = get();
        _subscribers.push(newSub);
        if (isConnected && _socket) {
            newSub.onConnect(_socket);
        }
    },
    unsubConnect(oldSub) {
        const { _subscribers } = get();
        const _newlistener = _subscribers.filter((aSub) => aSub !== oldSub);
        set({ _subscribers: _newlistener });
        oldSub.onDisconnect();
    },
}));
