import styles from "./AvatarPreview.module.scss";

export interface AvatarPreviewProps {
    dataURL: string;
}

export default function AvatarPreview({ dataURL }: AvatarPreviewProps) {
    // console.log("Rendering AvatarPreview")
    return (
        <div className={styles.preview}>
            <img className={styles.imgpreview1} src={dataURL} alt="image preview" />

            <img className={styles.imgpreview2} src={dataURL} alt="image preview" />

            <img className={styles.imgpreview3} src={dataURL} alt="image preview" />

            <img className={styles.imgpreview4} src={dataURL} alt="image preview" />
        </div>
    );
}
