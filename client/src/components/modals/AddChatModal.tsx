import styles from "./AddChatModal.module.scss";

import { useEffect, useState } from "react";

import { UserView } from "../ui/communication/search/UserView";

import { CreateChat } from "@/actions/Chat.actions";

import { useUsersSearch } from "@/store/UsersSearch";
import { useConnect } from "@/store/Connent";

export interface AddChatModalProps {
    close?: () => void;
}

export default function AddChatModal({ close: doClose }: AddChatModalProps) {
    const { subConnect, unsubConnect } = useConnect.getState();

    const [text, setText] = useState("");

    const sercher = useUsersSearch.getState();
    const users = useUsersSearch((state) => state.users);

    useEffect(() => {
        subConnect(sercher);
        return () => unsubConnect(sercher);
    }, []);

    useEffect(() => {
        sercher.search(text);
    }, [text]);

    const createChat = (userId: string) => {
        CreateChat(userId);
    };

    const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div className={styles.modal} onClick={doClose}>
            <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.searchBlock}>
                    <span className={styles.label}>Search by name</span>
                    <input
                        className={styles.input}
                        placeholder="name..."
                        type="text"
                        value={text}
                        onChange={changeText}
                    />
                </div>
                <div className={styles.usersList + " scrollbar1"}>
                    {[...users]?.map((u, i) => (
                        <UserView key={i} user={u} createChat={createChat} />
                    ))}
                </div>
            </div>
        </div>
    );
}
