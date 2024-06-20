import { create } from "zustand";
import { Socket } from "socket.io-client";

import { IConnect } from "./Connent";
import { ServerNameActions } from "@/common/gateway.interfaces";
import { IUserForSearch } from "@/common/user.interface";

export interface UsersSearchStoreModel extends IConnect {
    _socket: Socket | null;
    onlines: string[];

    users: IUserForSearch[];

    _name: string;
    _nextName: string;
    _runningReq: boolean;
    // _loaded:boolean
    // _isError:boolean

    search: (name: string) => void;
    _runSearch: () => void;
}

export const useUsersSearch = create<UsersSearchStoreModel>((set, get) => ({
    _socket: null,
    onlines: [],

    users: [],

    _name: "",
    _nextName: "",
    _runningReq: false,

    onConnect(newSocket) {
        set({ _socket: newSocket });
    },
    onDisconnect() {
        set({ _socket: null });
    },

    search(name) {
        set({ _nextName: name });
        const { _runningReq } = get();
        if (!_runningReq) {
            this._runSearch();
        }
    },
    async _runSearch() {
        const { _socket, _nextName, _runningReq } = get();
        if (!_socket || _runningReq) return;

        set({ _runningReq: true });

        _socket
            .timeout(5000)
            .emit(
                ServerNameActions.searchForUsers,
                { name: _nextName },
                (error: any, data: IUserForSearch[]) => {
                    set({
                        _runningReq: false,
                        _name: _nextName,
                        users: data,
                    });

                    const newName = get()._nextName;
                    if (newName !== _nextName) {
                        this._runSearch();
                    }
                }
            );
    },
}));
