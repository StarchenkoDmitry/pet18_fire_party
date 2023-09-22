import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    login:string;

    @IsString()
    password:string;
}


export class SignUpDto {
    @IsString()
    login:string;    

    @IsString()
    email:string;

    @IsString()
    name:string;

    @IsString()
    surname:string;

    @IsString()
    password:string;
}
