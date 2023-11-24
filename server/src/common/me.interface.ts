import { IUser, IUserForMe } from "./user.interface";

export interface IMyChat{
    id:string
    lastMessageID:string | null
    user:Pick<IUser, "id" | "name" | "imageID">
}




export const ME_EVENT_INIT = "ME_EVENT_INIT"
export type TYPE_ME_EVENT_INIT = { me:IUserForMe }

export const ME_EVENT_ERROR_INIT = "ME_EVENT_ERROR_INIT"
export type TYPE_ME_EVENT_ERROR_INIT = undefined

export const ME_EVENT_CHANGE_NAME = "ME_EVENT_CHANGE_NAME"
export type TYPE_ME_EVENT_CHANGE_NAME = { name:string }

export const ME_EVENT_CHANGE_SURNAME = "ME_EVENT_CHANGE_SURNAME"
export type TYPE_ME_EVENT_CHANGE_SURNAME = { surname:string }


export type EventMe =
| { type:typeof ME_EVENT_INIT, data: TYPE_ME_EVENT_INIT }
| { type:typeof ME_EVENT_ERROR_INIT, data: TYPE_ME_EVENT_ERROR_INIT }
| { type:typeof ME_EVENT_CHANGE_NAME, data: TYPE_ME_EVENT_CHANGE_NAME }
| { type:typeof ME_EVENT_CHANGE_SURNAME, data: TYPE_ME_EVENT_CHANGE_SURNAME }




export const MECHATS_EVENT_INIT = "MECHATS_EVENT_INIT"
export type TYPE_MECHATS_EVENT_INIT = { chats:IMyChat[] }

export const MECHATS_EVENT_ERROR_INIT = "MECHATS_EVENT_ERROR_INIT"
export type TYPE_MECHATS_EVENT_ERROR_INIT = undefined

export const MECHATS_EVENT_CHANGE_NAME = "MECHATS_EVENT_CHANGE_NAME"
export type TYPE_MECHATS_EVENT_CHANGE_NAME = { userId:string, name:string }

export const MECHATS_EVENT_CHANGE_SURNAME = "MECHATS_EVENT_CHANGE_SURNAME"
export type TYPE_MECHATS_EVENT_CHANGE_SURNAME = { userId:string, surname:string }


export type EventMeChats =
| { type:typeof MECHATS_EVENT_INIT, data: TYPE_MECHATS_EVENT_INIT }
| { type:typeof MECHATS_EVENT_ERROR_INIT, data: TYPE_MECHATS_EVENT_ERROR_INIT }
| { type:typeof MECHATS_EVENT_CHANGE_NAME, data: TYPE_MECHATS_EVENT_CHANGE_NAME }
| { type:typeof MECHATS_EVENT_CHANGE_SURNAME, data: TYPE_MECHATS_EVENT_CHANGE_SURNAME }
