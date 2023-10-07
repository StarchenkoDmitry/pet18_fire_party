import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateMessageDto } from './chat.dto';

import { Request, Response } from 'express';
import { AuthGuard, REQ_RES_COOKIE_SESSION } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { UserDec } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { IChatInfoKorotko, IMeChats } from 'src/common/inerfaces';
import { IGetChatInfo } from 'src/common/chat.interface';

@Controller('chat')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ChatController {
  constructor(private readonly chatService: ChatService,
              private readonly userService: UserService) {}

  @Post("create")
  @UseGuards(AuthGuard)
  async create(@Body() { id }: CreateChatDto,@UserDec() user:User) {
    const myid = user.id;
    // console.log("/chat/create dto: ",{id});
    return await this.chatService.create(myid,id);
  }

  @Post("createmessage")
  @UseGuards(AuthGuard)
  async createMessage(@Body() {id, message}: CreateMessageDto,@UserDec() user:User) {
    // console.log("/chat/createmessage dto: ",{id, message});
    
    return await this.chatService.createMessage(user.id,id,message);
  }

  @Get()
  findAll() {
    return this.chatService.getAll();
  }

  @Get("messages/:id")
  @UseGuards(AuthGuard)
  async getAllMessages(@Param("id") id:string, @UserDec() user:User) {
    // console.log("/chat/messages id: ", id)
    return await this.chatService.getAllMessages(user.id,id);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async getMyChats(@UserDec() user:User):Promise<IMeChats>{
    // console.log("/chat/me");
    const chats = await this.chatService.getMyChats(user.id);
    const chatskorotko:IChatInfoKorotko[] = chats.map((e,i)=>{
      return {
        id:e.id,
        lastMessageID:e.lastMessageID,
        user:e.users.find(e=>e.id !== user.id)
      }
    });

    return {
      meid:user.id,
      chats:chatskorotko
    };
  }


  @Get("my/:id")
  @UseGuards(AuthGuard)
  async getChatInfo(@Param('id') id: string,@UserDec() user:User):Promise<IGetChatInfo>{
    console.log("/chat/my/:id ",id);

    const chat = await this.chatService.get(id);
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

  
  @Delete('message/:id')
  async toDelete(@Param('id') id: string) {
    // console.log(`/chat/message/:id ${id}`)
    return await this.chatService.delete(id);
  }
}
