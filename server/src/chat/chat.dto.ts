import { PartialType } from '@nestjs/swagger';

export class CreateChatDto {
    pubID:number
}


export class UpdateChatDto extends PartialType(CreateChatDto) {

}
