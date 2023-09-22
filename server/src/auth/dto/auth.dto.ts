import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    login:string;

    @IsString()
    password:string;
}


export class SignUpDto {

    @MinLength(4)
    login:string;
    
    @MinLength(4)
    @IsEmail()
    email:string;

    @MinLength(2)
    password:string;

    @IsString()
    name:string;

    @IsString()
    surname:string;
}
