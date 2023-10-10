import styles from "./AvatarEditorModal.module.scss";

import { ConvertBlobToStringBase64, ConvertCanvasToBlob } from "@/utils/Convert";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import { UpdateImage } from "@/actions/Image.actions";


const url = "http://127.0.0.1:3000/api/image/buffer/2";


export interface AvatarEditorModalProps{    
    // imageURL: string;
    doClose?:()=>void;

    loadImage?:()=>Promise<string | undefined>;
    saveImage?:(dataURL:string)=>Promise<boolean>;
}



export default function AvatarEditorModal({doClose,loadImage,saveImage}:AvatarEditorModalProps) {
    console.log("Rendering AvatarEditorModal")

    const editor = useRef<AvatarEditor>(null);
    const [scale,setScale] = useState(1);
    
    const [image,setImage] = useState("");

    const inputFile = useRef(null);

    useEffect(()=>{
        const dfdf = async ()=>{
            const res = await axios.get(url,{
                responseType:"blob",
                withCredentials:true
            })
            await ConvertBlobToStringBase64(res.data).then(res2=>{
                setImage(res2);
            });
            console.log("IMAGE: ", res);
        }
        dfdf();
    },[]);
    

    const changeScale = (event: ChangeEvent<HTMLInputElement>) => {
        const scale = parseFloat(event.target.value)
        setScale( scale )
    }

    const doSaveImage = async () => {
        if (editor && editor.current) {
            const canvas = editor.current.getImage()//размер как у Editor 
            const canvasScaled = editor.current.getImageScaledToCanvas()//роазмер с маштабом

            if(!canvas || !canvasScaled) return;

            console.log("canvas,canvasScaled",canvas,canvasScaled)
            
            console.log("canvas: ",await ConvertCanvasToBlob(canvas))
            console.log("canvasScaled: ",await ConvertCanvasToBlob(canvasScaled))

            await UpdateImage("2",await ConvertCanvasToBlob(canvas))
        }
    }

    return (
        <div className={styles.modal} onClick={doClose}>
            <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
                <img src={image} alt="" />
                <h2>EditorAvatar</h2><br/>
                <AvatarEditor
                    ref={editor}
                    image={image}

                    width={250}
                    height={250}

                    border={20}

                    crossOrigin="use-credentials"
                    scale={scale}
                /><br/>
                
                <input ref={inputFile} type="file" id="file" style={{display:"none"}} />
                <button onClick={()=>{

                }} >Upload</button>

                <input type="file" id="file2" />

                <div>Zoom:{scale}</div>
                <input
                    name="scale"
                    type="range"
                    onChange={changeScale}
                    min='0.1'
                    max="2"
                    step="0.01"
                    defaultValue="1"
                /><br/>

                <button onClick={doSaveImage}>Save</button>
            </div>
        </div>
    )
}
