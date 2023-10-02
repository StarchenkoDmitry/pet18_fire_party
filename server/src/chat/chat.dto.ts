import { PartialType } from '@nestjs/swagger';

export class CreateChatDto {
    pubid:string;//pubid с кем будет создат чат
}


export class UpdateChatDto extends PartialType(CreateChatDto) {

}
