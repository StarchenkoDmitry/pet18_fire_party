import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @Length(4,16)
    login:string;

    @Length(4,32)
    password:string;
}


export class SignUpDto {

    @Length(4,16)
    login:string;
    
    @Length(4,32)
    @IsEmail()
    email:string;

    @Length(4,32)
    password:string;

    @MaxLength(16)
    @IsString()
    name:string;

    @MaxLength(16)
    @IsString()
    surname:string;
}
