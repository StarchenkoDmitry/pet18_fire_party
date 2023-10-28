import { Controller, Get, Post, Body, Param, Delete, ValidationPipe, UsePipes, UseGuards, BadRequestException } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { CreateChatDto, CreateMessageDto } from './chat.dto';

import { AuthGuard } from 'src/auth/auth.guard';
import { UserRepository } from 'src/user/user.repository';
import { UserDec } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { IMyChat } from 'src/common/me.interface';

@Controller('chat')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ChatController {
  constructor(private readonly chatRepository: ChatRepository,
              private readonly userRepository: UserRepository) {}

  @Post("create")
  @UseGuards(AuthGuard)
  async create(@Body() { id }: CreateChatDto,@UserDec() user:User) {
    const myid = user.id;
    // console.log("/chat/create dto: ",{id});
    return await this.chatRepository.create(myid,id);
  }

  @Post("createmessage")
  @UseGuards(AuthGuard)
  async createMessage(@Body() {id, message}: CreateMessageDto,@UserDec() user:User) {
    // console.log("/chat/createmessage dto: ",{id, message});
    
    return await this.chatRepository.createMessage(id, user.id, message);
  }

  @Get()
  findAll() {
    return this.chatRepository.getAll();
  }

  @Get("messages/:id")
  @UseGuards(AuthGuard)
  async getAllMessages(@Param("id") id:string, @UserDec() user:User) {
    // console.log("/chat/messages id: ", id)
    return await this.chatRepository.getAllMessages(id, user.id);
  }

  @Get("my")
  @UseGuards(AuthGuard)
  async getMyChats(@UserDec() user:User):Promise<IMyChat[]>{
    // console.log("/chat/my");
    return await this.userRepository.getMyChats(user.id);
  }


  @Get("my/:id")
  @UseGuards(AuthGuard)
  async getChatInfo(@Param('id') id: string,@UserDec() user:User):Promise<IMyChat>{
    // console.log("/chat/my/:id ",id);

    const chat = await this.chatRepository.getIncludeUsers(id);
    if(!chat) throw new BadRequestException(`Chat(id: ${id}) is not exist.`)
    
    const rawUser = chat.users.find(e=>e.id!== user.id);
    if(!rawUser) throw new BadRequestException(`Chat(id: ${id}) without a user.`)

    return {
      id,
      lastMessageID:chat.lastMessageID,
      user:{
        id:rawUser.id,
        name:rawUser.name,
        imageID:rawUser.imageID
      }
    }
  }

  
  // @Delete('message/:id')
  // @UseGuards(AuthGuard)
  // async toDelete(@Param('id') messageId: string,@UserDec() user:User) {
  //   // console.log(`/chat/message/:id ${id}`)
  //   return await this.chatRepository.removeMessage(messageId,user.id);
  // }

  @Delete('message')
  @UseGuards(AuthGuard)
  async toDelete(
    @Body('messageId') messageId: string,
    @Body('chatId') chatId: string,
    @UserDec() user:User) {
    console.log(`/chat/message: `,chatId,messageId,user.id)
    return await this.chatRepository.removeMessage(chatId,messageId,user.id)
  }
}
