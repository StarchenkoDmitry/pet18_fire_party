import { IsString } from "class-validator";

export class CreateChatDto {
    @IsString()
    id: string;
}

export class CreateMessageDto {
    @IsString()
    id: string;
    @IsString()
    message: string;
}
