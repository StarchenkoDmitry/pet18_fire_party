import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './chat.dto';

import { Request, Response } from 'express';
import { AuthGuard, REQ_KET_TOKEN } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('chat')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ChatController {
  constructor(private readonly chatService: ChatService,
              private readonly userService: UserService) {}

  @Post()
  @UseGuards(new AuthGuard())
  create(@Body() createChatDto: CreateChatDto,@Req() req:Request) {
    const meToken = req.signedCookies[REQ_KET_TOKEN];
    if(!meToken) return;

    const user = this.userService.findOneByToken(meToken);
    if(!user) return;
    
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.getAll();
  }

  @Get("me")
  @UseGuards(new AuthGuard())
  async getMyChats(@Req() req:Request){
    const meToken = req.signedCookies[REQ_KET_TOKEN];
    // console.log(`getMyChats(${meToken})`);
    if(!meToken) return;

    const user = await this.userService.findOneByToken(meToken);
    // console.log(`getMyChats(${meToken}) user: `,user);

    if(!user) return;

    const chats = await this.chatService.getMyChats(user.id);
    if(chats) return chats;

  }
  

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(+id, updateChatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
