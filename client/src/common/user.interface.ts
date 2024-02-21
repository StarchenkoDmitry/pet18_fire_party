export interface IUser {
    id: string;

    login: string;
    email: string;
    passwordHash: string;

    session: string | null;

    name: string | null;
    surname: string | null;

    imageID: string | null;
}

export type IUserForMe = Omit<IUser, "passwordHash" | "session">;
export type IUserForSearch = Pick<IUser, "name" | "surname" | "id" | "imageID">;

//WebSocket
export const USER_EVENT_CHANGE_NAME = "USER_EVENT_CHANGE_NAME";
export type TYPE_USER_EVENT_CHANGE_NAME = { name: string };

export const USER_EVENT_CHANGE_SURNAME = "USER_EVENT_CHANGE_SURNAME";
export type TYPE_USER_EVENT_CHANGE_SURNAME = { surname: string };

export type UserEvent =
    | { type: typeof USER_EVENT_CHANGE_NAME; data: TYPE_USER_EVENT_CHANGE_NAME }
    | { type: typeof USER_EVENT_CHANGE_SURNAME; data: TYPE_USER_EVENT_CHANGE_SURNAME };
