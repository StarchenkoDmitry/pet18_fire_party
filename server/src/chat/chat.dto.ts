import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateChatDto {
    @IsString()
    pubid:string;//pubid с кем будет создат чат
}


// export class UpdateChatDto extends PartialType(CreateChatDto) {

// }
