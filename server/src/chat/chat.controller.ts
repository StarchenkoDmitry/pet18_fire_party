import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateMessageDto } from './chat.dto';

import { Request, Response } from 'express';
import { AuthGuard, REQ_RES_COOKIE_SESSION } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { UserDec } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { MeChats } from 'src/common/inerfaces';

@Controller('chat')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ChatController {
  constructor(private readonly chatService: ChatService,
              private readonly userService: UserService) {}

  @Post("create")
  @UseGuards(AuthGuard)
  async create(@Body() createChatDto: CreateChatDto,@UserDec() user:User) {
    const me_pubid = user.pubid;
    const {pubid: friend_pubid } = createChatDto;
    console.log("#chat create: ",createChatDto)

    // return await this.chatService.create(me_pubid,friend_pubid);
    return await this.chatService.create(me_pubid,friend_pubid);
  }

  @Post("createmessage")
  @UseGuards(AuthGuard)
  async createMessage(@Body() createMessageDto: CreateMessageDto,@UserDec() user:User) {
    const {pubid: chat_pubid, message} = createMessageDto;
    // console.log("#chat createmessage: ",createMessageDto)
    
    return await this.chatService.createMessage(user.id,chat_pubid,message);
  }

  @Get()
  findAll() {
    return this.chatService.getAll();
  }

  @Get("getmessages/:pubid")
  @UseGuards(AuthGuard)
  async getAllMessages(@Param("pubid") pubid:string, @UserDec() user:User) {
    console.log(`#chat getmessages(pubid:${pubid})`)
    return await this.chatService.getAllMessages(user.id,pubid);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async getMyChats(@UserDec() user:User):Promise<MeChats>{
    const chats = await this.chatService.getMyChats(user.id);

    return {
      mepubid:user.pubid,
      chats:chats
    };
  }
  
  @Delete('message/:id')
  async toDelete(@Param('id') id: string) {
    console.log(`/chat/message/${id}`)
    return await this.chatService.delete(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(+id, updateChatDto);
  // }

}
