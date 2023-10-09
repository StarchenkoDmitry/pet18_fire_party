import { CreateBlobFromCanvas } from "@/utils/Convert";
import styles from "./AvatarEditorModal.module.scss";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { UpdateImage } from "@/actions/Actions";
import api from "@/api/api";
import axios from "axios";


const url = "http://127.0.0.1:3000/api/image/buffer/2";


export interface AvatarEditorModalProps{
    // imageURL: string;
    doClose?:()=>void;

    saveFile?:(file:Blob)=>void;
}

function blobToBase64(blob:Blob):Promise<string>{
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

export default function AvatarEditorModal({doClose}:AvatarEditorModalProps) {
    console.log("Rendering AvatarEditorModal")

    const editor = useRef<AvatarEditor>(null);
    const inputFile = useRef(null);
    const [scale,setScale] = useState(1);
    
    
    const [im,setIm] = useState("");


    useEffect(()=>{
        const dfdf = async ()=>{
            const res = await axios.get(url,{
                responseType:"blob",
                withCredentials:true
            })
            await blobToBase64(res.data).then(res2=>{
                setIm(res2);
            });
            console.log("IMAGE: ", res);
        }
        dfdf();
    },[]);
    

    const changeScale = (event: ChangeEvent<HTMLInputElement>) => {
        const scale = parseFloat(event.target.value)
        setScale( scale )
    }

    const saveImage = async () => {
        if (editor && editor.current) {
          const canvas = editor.current.getImage()//размер как у Editor 
          const canvasScaled = editor.current.getImageScaledToCanvas()//роазмер с маштабом

          if(!canvas || !canvasScaled) return;

          console.log("CLICL",canvas,canvasScaled)
          
          console.log("blob: ",await CreateBlobFromCanvas(canvas))
          console.log("blob2: ",await CreateBlobFromCanvas(canvasScaled))

          await UpdateImage("2",await CreateBlobFromCanvas(canvasScaled))
        }
    }

    return (
        <div className={styles.modal} onClick={doClose}>
            <div className={styles.content} onClick={(e)=>e.stopPropagation()}>
                <img src={im} alt="" />
                <h2>EditorAvatar</h2><br/>
                <AvatarEditor
                    ref={editor}
                    image={im}

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

                <button onClick={saveImage}>Save</button>
            </div>
        </div>
    )
}
