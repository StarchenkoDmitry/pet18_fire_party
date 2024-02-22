import { IsEmail, Length, MaxLength } from "class-validator";
import {
    MAX_EMAIL_LENGTH,
    MAX_LOGIN_LENGTH,
    MAX_NAME_LENGTH,
    MAX_PASSWORD_LENGTH,
    MAX_SURNAME_LENGTH,
    MIN_EMAIL_LENGTH,
    MIN_LOGIN_LENGTH,
    MIN_PASSWORD_LENGTH,
} from "src/common/constants";

export class LoginDto {
    @Length(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)
    login: string;

    @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
    password: string;
}

export class SignUpDto {
    @Length(MIN_LOGIN_LENGTH, MAX_LOGIN_LENGTH)
    login: string;

    @Length(MIN_EMAIL_LENGTH, MAX_EMAIL_LENGTH)
    @IsEmail()
    email: string;

    @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)
    password: string;

    @MaxLength(MAX_NAME_LENGTH)
    name: string;

    @MaxLength(MAX_SURNAME_LENGTH)
    surname: string;
}
