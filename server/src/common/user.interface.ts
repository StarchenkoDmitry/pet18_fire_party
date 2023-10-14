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
