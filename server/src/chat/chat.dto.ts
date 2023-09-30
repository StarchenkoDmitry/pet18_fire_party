import { PartialType } from '@nestjs/swagger';

export class CreateChatDto {
    pubID:number;//pubid с кем будет создат чат
}


export class UpdateChatDto extends PartialType(CreateChatDto) {

}
