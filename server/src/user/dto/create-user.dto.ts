export class CreateUserDto {
    login: string;
    passwordHash: string;
    email: string;

    session?: string;

    name?: string;
    surname?: string;
}
