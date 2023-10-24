import { useParams } from "react-router-dom";

import Chat from "../сomponents/chat/Chat";


export default function ChatPanel() {    
    let { id } = useParams();
    // console.log(`Render ChatPanel(${id}) `);
    return( <Chat key={id} id={id || ""} /> );
}
