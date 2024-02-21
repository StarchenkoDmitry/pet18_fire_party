import styles from "./MessageBox.module.scss";

import { memo, useState } from "react";

import { convertToStringDate } from "@/utils/Date";

import RemoveMessageModal from "@/components/modals/chat/RemoveMessageModal";
import { useMe } from "@/store/Me";
import { IMessage } from "@/common/message.interface";
import { useChat } from "@/store/Chat";

const MOUSE_RIGHT = 2;

export interface MessageProps {
    message: IMessage;
}

const MessageBox = memo(({ message }: MessageProps) => {
    const removeMessage = useChat((state) => state.removeMessage);

    const myId = useMe((state) => state.me?.id);
    const isMyMessage = message.userID === myId;

    const [showEditModal, setShowEditModal] = useState(false);
    const [cordsModal, setCordsModal] = useState({ x: 0, y: 0 });

    const createAt = convertToStringDate(message.createAt);

    const eventClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.button === MOUSE_RIGHT) {
            event.preventDefault();
            setShowEditModal(true);
            setCordsModal({
                x: event.clientX,
                y: event.clientY,
            });
        }
    };

    const closeModal = () => {
        setShowEditModal(false);
    };

    const deleteMessage = () => {
        removeMessage(message.id);
    };

    return (
        <div className={styles.messageContainer} data-my-message={isMyMessage}>
            <div
                className={styles.message}
                data-my-message={isMyMessage}
                onContextMenu={eventClick}
            >
                <p className={styles.message_text}>
                    {message.text}
                    <span className={styles.message_createAt1}>{createAt}</span>
                    <span className={styles.message_createAt2}>{createAt}</span>
                </p>
                {showEditModal && (
                    <RemoveMessageModal
                        toRemoveMessage={deleteMessage}
                        toClose={closeModal}
                        cords={cordsModal}
                    />
                )}
            </div>
        </div>
    );
});

export default MessageBox;
