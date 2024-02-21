import styles from "./Avatar.module.scss";

import { GetImageUrl } from "@/utils/Image";

export interface AvatarProps {
    imageID: string | null;
    onClick?: () => void;
}

export default function Avatar({ imageID, onClick }: AvatarProps) {
    // console.log("Rendering Avatar")

    const imageURL = GetImageUrl(imageID);

    return (
        <img
            onClick={onClick}
            className={styles.avatarImg + ` ${onClick && styles.avatarImgClick}`}
            src={imageURL}
            alt="My avatar"
        />
    );
}
