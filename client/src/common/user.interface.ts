export interface IUser {
    id: string

    login: string
    email: string
    passwordHash: string

    session: string | null

    name: string | null
    surname: string | null

    imageID: string | null;
}

export type IUserForMe = Omit<IUser, "passwordHash" | "session">

export type IUserForSearch = Pick<IUser, "name" | "surname" | "id" | "imageID">
