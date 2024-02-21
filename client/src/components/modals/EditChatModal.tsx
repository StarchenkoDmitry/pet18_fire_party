import styles from "./EditChatModal.module.scss";

import { useEffect, useRef } from "react";

export interface EditChatModalProps {
    toClose?: () => void;
    toDeleteChat?: () => void;
    autoCloseTime?: number;
    cords: { x: number; y: number };
}

export default function EditChatModal({
    toClose,
    toDeleteChat,
    autoCloseTime = 1500,
    cords,
}: EditChatModalProps) {
    const waitClose = () => {
        if (toClose) toClose();
    };

    const timer = useRef<any>(null);

    useEffect(() => {
        timer.current = setTimeout(waitClose, autoCloseTime);
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        };
    }, []);

    const eventMouseEnter = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }
    };

    const eventMouseLeave = () => {
        if (timer.current) {
            return;
        }
        timer.current = setTimeout(waitClose, autoCloseTime);
    };

    const eventButtonDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        if (toClose) toClose();
        if (toDeleteChat) toDeleteChat();
    };

    const cancelContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    return (
        <div
            className={styles.editModal}
            style={{ left: cords.x, top: cords.y }}
            onClick={cancelContextMenu}
            onContextMenu={cancelContextMenu}
            onMouseEnter={eventMouseEnter}
            onMouseLeave={eventMouseLeave}
        >
            <button className={styles.btnDeleteChat} onClick={eventButtonDelete}>
                delete
            </button>
        </div>
    );
}
