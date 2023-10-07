import { ChangeEvent, useRef, useState } from "react";
import styles from "./Profile.module.scss"

import AvatarEditor from 'react-avatar-editor'
import api from "@/api/api";

export default function Profile() {
  const editor = useRef<AvatarEditor>(null);

  const [scale,setScale] = useState(1.2);

  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value)
    setScale( scale )
  }

  
  const handleSave = () => {
    const img = editor.current?.getImageScaledToCanvas().toDataURL()
    const canvas = editor.current?.getImage();
  }
  return (
    <div className={styles.page}>
      <div>
        <AvatarEditor
          ref={editor}
          image="http://127.0.0.1:3000/api/image/buffer/7fcc2423-8ec3-4020-9e70-b976207654a2"
          width={250}
          height={250}
          border={50}
          crossOrigin="use-credentials"
          scale={scale}
        />
        <button onClick={async () => {
          if (editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = editor.current?.getImage()

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = editor.current?.getImageScaledToCanvas()
            if(!canvas || !canvasScaled) return;

            console.log("CLICL",canvas,canvasScaled)
            
            console.log("blob: ",await CreateBlobFromCanvas(canvas))
            console.log("blob2: ",await CreateBlobFromCanvas(canvasScaled))

            await UpdateImage("7fcc2423-8ec3-4020-9e70-b976207654a2",await CreateBlobFromCanvas(canvasScaled))
          }
        }}>Save</button>
        {/* <img src={imageURL} /> */}
        Zoom:{scale}
        <input
          name="scale"
          type="range"
          onChange={handleScale}
          min='0.1'
          max="2"
          step="0.01"
          defaultValue="1"
        />
      </div>
    </div>
  );
}

export async function CreateBlobFromCanvas(el: HTMLCanvasElement){
  const dataUrl = el.toDataURL()
  const result = await fetch(dataUrl)
  const blob = await result.blob()
  return blob;
}

export async function UpdateImage(id:string,blob:Blob) {
  try {
    const formData = new FormData();
    formData.append("file", blob);

    const res = await api.post(`image/update/${id}`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("image/update/:id res: ",res.data)

    if(res.status === 200){
        return res.data;
    }else return;
  } catch (error) {
      console.log("Error: ",error)
  }
}