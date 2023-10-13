import styles from "./Avatar.module.scss";


export interface AvatarProps{
    imageID:string | null;
    onClick?: ()=>void;
}

export default function Avatar({imageID,onClick}:AvatarProps) {
    console.log("Rendering Avatar")

    const imageURL = imageID ? `http://127.0.0.1:3000/api/image/buffer/${imageID}` : 
    "/img/user.png";

    return (
        <img
            onClick={onClick}
            className={styles.avatarImg + ` ${onClick && styles.avatarImgClick}`}
            src={imageURL}
            alt="My avatar"
        />
    );
}
