import { User } from "../entities/user.entity";


export class CreateUserDto{// extends User{
    login:string;
    passwordHash:string;
    email:string;

    token?:string;

    name?:string;
    surname?:string;
}