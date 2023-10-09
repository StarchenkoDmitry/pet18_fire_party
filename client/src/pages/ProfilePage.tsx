import { ChangeEvent, useRef, useState } from "react";
import styles from "./ProfilePage.module.scss"

import AvatarEditor from 'react-avatar-editor'
import api from "@/api/api";
import { UpdateImage } from "@/actions/Actions";
import { CreateBlobFromCanvas } from "@/utils/Convert";

export default function ProfilePage() {
  const editor = useRef<AvatarEditor>(null);

  const [scale,setScale] = useState(1);

  const handleScale = (e: ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value)
    setScale( scale )
  }
  
  const url = "http://127.0.0.1:3000/api/image/buffer/2";
  
  return (
    <div className={styles.page}>
      <div>
        <AvatarEditor
          ref={editor}
          image={url}

          width={250}
          height={250}

          border={20}

          crossOrigin="use-credentials"          
          scale={scale}
        /><br/>
        <button onClick={async () => {
          if (editor && editor.current) {
            const canvas = editor.current.getImage()//размер как у Editor 
            const canvasScaled = editor.current.getImageScaledToCanvas()//роазмер с маштабом

            if(!canvas || !canvasScaled) return;

            console.log("CLICL",canvas,canvasScaled)
            
            console.log("blob: ",await CreateBlobFromCanvas(canvas))
            console.log("blob2: ",await CreateBlobFromCanvas(canvasScaled))

            await UpdateImage("2",await CreateBlobFromCanvas(canvasScaled))
          }
        }}>Save</button>
        <div>Zoom:{scale}</div>
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


