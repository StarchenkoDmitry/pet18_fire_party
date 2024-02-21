import AvatarPreview from "@/components/ui/profile/AvatarPreview";
import styles from "./AvatarEditorModal.module.scss";

import { ConvertBlobToStringBase64, ConvertCanvasToDataURL } from "@/utils/Convert";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const TIME_OF_UPDATE = 150; //ms

export interface AvatarEditorModalProps {
    doClose?: () => void;
    loadImage?: () => Promise<string | undefined>;
    saveImage?: (dataURL: string) => Promise<boolean>;
}

export default function AvatarEditorModal({
    doClose,
    loadImage,
    saveImage,
}: AvatarEditorModalProps) {
    // console.log("Rendering AvatarEditorModal")

    const editor = useRef<AvatarEditor>(null);

    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);

    const [image, setImage] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string>("");

    const inputFile = useRef<HTMLInputElement>(null);

    const resetOption = () => {
        setScale(1);
        setRotation(0);
    };

    const openFinderFile = () => {
        if (inputFile.current) inputFile.current.click();
    };

    const loadFileToImage = async (event: ChangeEvent<HTMLInputElement>) => {
        // console.log("event ",event)
        if (!event.target.files || event.target.files.length === 0) return;

        const file: File | null = event.target.files.item(0);
        if (!file) return;

        if (saveImage) {
            await saveImage(await ConvertBlobToStringBase64(file));
            // startUpdatePreviewImage();
            StartLoadImage();
            resetOption();
        }
    };

    const StartLoadImage = async () => {
        if (!loadImage) return;
        loadImage().then((res) => {
            if (res) {
                setImage(res);
            } else {
                setImage("/img/user.png");
            }
        });
    };

    useEffect(() => {
        StartLoadImage();
    }, []);

    const doSaveImage = async () => {
        if (editor && editor.current) {
            const canvas = editor.current.getImage();

            if (!canvas) return;

            console.log("canvas ", canvas);

            if (!saveImage) return;
            await saveImage(await ConvertCanvasToDataURL(canvas));
            await StartLoadImage();
            resetOption();
        }
    };

    const refka = useRef<NodeJS.Timeout | undefined>();
    const updatePreviewImage = async () => {
        if (!editor || !editor.current) {
            refka.current = undefined;
            return;
        }

        const img = editor.current.getImage();
        if (!img) {
            refka.current = undefined;
            return;
        }

        setImagePreview(await ConvertCanvasToDataURL(img));

        refka.current = undefined;
    };
    const startUpdatePreviewImage = () => {
        if (!refka.current) {
            refka.current = setTimeout(() => {
                updatePreviewImage();
            }, TIME_OF_UPDATE);
        }
    };

    const rotationEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setRotation(parseFloat(event.target.value));
        startUpdatePreviewImage();
    };

    const mouseMoveEvent = async (event: Event) => {
        startUpdatePreviewImage();
    };

    const scaleEvent = (event: ChangeEvent<HTMLInputElement>) => {
        setScale(parseFloat(event.target.value));
        startUpdatePreviewImage();
    };

    const imageReadyEvent = async (event: Event) => {
        startUpdatePreviewImage();
    };

    const eventStopPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    return (
        <div className={styles.modal} onClick={doClose}>
            <div className={styles.content} onClick={eventStopPropagation}>
                <h2>EditorAvatar</h2>
                <div className={styles.editor}>
                    <AvatarEditor
                        crossOrigin="use-credentials"
                        ref={editor}
                        image={image}
                        width={200}
                        height={200}
                        className={styles.canvasEditor}
                        border={16}
                        borderRadius={10000}
                        color={[0, 0, 0, 0.75]}
                        scale={scale}
                        rotate={rotation}
                        onMouseMove={mouseMoveEvent}
                        onImageReady={imageReadyEvent}
                    />
                    <div className={styles.editorSettings}>
                        <input
                            onChange={loadFileToImage}
                            ref={inputFile}
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                        />
                        <button onClick={openFinderFile} className={styles.btn_file}>
                            Add a picture file
                        </button>

                        <div>Zoom ({scale})</div>
                        <input
                            name="scale"
                            type="range"
                            onChange={scaleEvent}
                            min="0.1"
                            max="2.5"
                            step="0.01"
                            value={scale}
                        />

                        <div>Rotation ({rotation})</div>
                        <input
                            name="rotation"
                            type="range"
                            onChange={rotationEvent}
                            min="-180"
                            max="180"
                            step="1"
                            value={rotation}
                        />

                        <button className={styles.btn_save} onClick={doSaveImage}>
                            Save
                        </button>
                    </div>
                </div>
                <h3 className={styles.editorPreview_lable}>Preview</h3>
                <div className={styles.editorPreview}>
                    <AvatarPreview dataURL={imagePreview} />
                </div>
            </div>
        </div>
    );
}
