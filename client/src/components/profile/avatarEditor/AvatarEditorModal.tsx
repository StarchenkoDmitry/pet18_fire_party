import styles from "./AvatarEditorModal.module.scss";

import { ConvertCanvasToDataURL } from "@/utils/Convert";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AvatarEditor, { ImageState } from "react-avatar-editor";
import AvatarPreview from "./ui/AvatarPreview";


export interface AvatarEditorModalProps{
    doClose?:()=>void;
    loadImage?:()=>Promise<string | undefined>;
    saveImage?:(dataURL:string)=>Promise<boolean>;
}

export default function AvatarEditorModal({doClose,loadImage,saveImage}:AvatarEditorModalProps) {
    console.log("Rendering AvatarEditorModal")

    const editor = useRef<AvatarEditor>(null);
    const [scale,setScale] = useState(1);
    
    const [image,setImage] = useState<string>("");
    const [imagePreview,setImagePreview] = useState<string>("");

    const inputFile = useRef(null);
    
    useEffect(()=>{
        if(!loadImage) return;
        loadImage().then(res=>{
            if(res){
                setImage(res);
            }else{
                setImage("/img/user.png");
            }
        });
    },[]);

    const changeScale = (event: ChangeEvent<HTMLInputElement>) => {
        const scale = parseFloat(event.target.value)
        setScale( scale )
    }

    const doSaveImage = async () => {
        if (editor && editor.current) {
            const canvas = editor.current.getImage()

            if(!canvas) return;

            console.log("canvas ",canvas)

            if(!saveImage)return;
            await saveImage(await ConvertCanvasToDataURL(canvas));
        }
    }

    const timeOfUpdate = 100;//ms

    const refka = useRef<{
        canavsImage:HTMLCanvasElement | undefined,
        funcdo: NodeJS.Timeout  | undefined
    }>({
        canavsImage:undefined,
        funcdo: undefined
    });

    const doingImg = async ()=>{
        const currentImg  =refka.current.canavsImage;
        refka.current.canavsImage = undefined;
        console.log("addImageOnDoinger ",currentImg)

        if(currentImg){
            setImagePreview(await ConvertCanvasToDataURL(currentImg));
        }
        
        if(refka.current.canavsImage){
            refka.current.funcdo = setTimeout(doingImg,timeOfUpdate);
        }else{
            refka.current.funcdo = undefined;
        }
    }

    const addImageOnDoinger= (img: HTMLCanvasElement)=>{
        // console.log("addImageOnDoinger")
        refka.current.canavsImage = img;

        if(!refka.current.funcdo){
            refka.current.funcdo = setTimeout(doingImg,timeOfUpdate);
        }
    }


    const mouseMoveEvent = async (event: Event)=>{
        // console.log("EVENT")
        if (!editor || !editor.current)return;
        const img = editor.current.getImage()
        if(!img) return;

        addImageOnDoinger(img);
    }
    


    const OnImageReady = async (event: Event)=>{
        console.log("OnImageReady event: ",event)

        if (editor && editor.current) {
            console.log("editor.current: ",editor.current)
            const canvas = editor.current.getImage()

            if(!canvas) return;

            console.log("canvas ",canvas)

            if(!saveImage)return;
            const dataULR = await ConvertCanvasToDataURL(canvas);

            setImagePreview(dataULR);
        }
    }

    return (
        <div className={styles.modal} onClick={doClose}>
            <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
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
                        color={[0,0,0,.75]}
                        scale={scale}

                        onMouseMove={mouseMoveEvent}
                        onImageReady={OnImageReady}
                    /><br/>
                    <div className="editor">
                        <input ref={inputFile} type="file" id="file" style={{display:"none"}} />
                        <button onClick={()=>{

                        }}>Upload a picture</button>

                        <div>Zoom:{scale}</div>
                        <input
                            name="scale"
                            type="range"
                            onChange={changeScale}
                            min='0.1'
                            max="2"
                            step="0.01"
                            defaultValue="1"
                        />
                        <button onClick={doSaveImage}>Save</button>
                    </div>
                </div>
                <h3 className={styles.editorPreview_lable}>Preview</h3>
                <div className={styles.editorPreview}>
                    <AvatarPreview dataURL={imagePreview} />
                </div>
            </div>
        </div>
    )
}




    // const mouseMoveEvent = async (event: Event)=>{
    //     console.log("EVENT")
    //     if (!editor || !editor.current)return;
    //     const img = editor.current.getImage()
    //     if(!img) return;

    //     setImagePreview(await ConvertCanvasToDataURL(img));
    // }




    // const doSaveImage = async () => {
    //     if (editor && editor.current) {
    //         const canvas = editor.current.getImage()//размер как у Editor 
    //         const canvasScaled = editor.current.getImageScaledToCanvas()//роазмер с маштабом

    //         if(!canvas || !canvasScaled) return;

    //         console.log("canvas,canvasScaled",canvas,canvasScaled)
            
    //         console.log("canvas: ",await ConvertCanvasToBlob(canvas))
    //         console.log("canvasScaled: ",await ConvertCanvasToBlob(canvasScaled))

    //         await UpdateImage("2",await ConvertCanvasToBlob(canvas))
    //     }
    // }