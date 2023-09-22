import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    login:string;

    @IsString()
    password:string;
}


export class SignUpDto {

    // @IsString()
    // @IsNotEmpty()
    @MinLength(4)
    login:string;
    
    // @IsString()
    @MinLength(4)
    @IsEmail()
    email:string;

    // @IsString()
    @MinLength(2)
    password:string;

    
    @IsString()
    name:string;

    @IsString()
    surname:string;

}
