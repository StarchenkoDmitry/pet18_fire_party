import styles from "./UserView.module.scss";

import { IUserForSearch } from "@/common/user.interface";
import { GetImageUrl } from "@/utils/Image";

export interface UserViewProps {
    user: IUserForSearch;
    createChat: (userId: string) => void;
}

export function UserView({ user, createChat }: UserViewProps) {
    const imgUrl = GetImageUrl(user.imageID);
    const _createChat = () => createChat(user.id);

    return (
        <div className={styles.userCard}>
            <img className={styles.userImage} src={imgUrl} alt="a user avatar" />
            <div className={styles.userInfo}>
                <span>{user.name}</span>
                <span>{user.surname}</span>
            </div>
            <button className={styles.btnAddUser} onClick={_createChat}>
                add
            </button>
        </div>
    );
}
