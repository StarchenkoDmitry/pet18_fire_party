import { User } from "@prisma/client"
import { Socket } from "socket.io"


export interface UserSocket extends Socket {
  userSession?: string
  user?: User
  userId?: string

  currentChatId?:string
  cancelSubOnChat?:()=>void

  cancelSubOnMe?:()=>void
}
