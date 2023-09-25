export interface User {
    login:string;
    passwordHash:string;
    email:string;

    token?:string;

    name?:string;
    surname?:string;
}