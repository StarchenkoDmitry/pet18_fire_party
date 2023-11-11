import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatDto {
    @IsString()
    id:string;//pubid с кем будет создат чат
}

export class CreateMessageDto {
    @IsString()
    id:string;
    @IsString()
    message:string;
}



// export class UpdateChatDto extends PartialType(CreateChatDto) {

// }
