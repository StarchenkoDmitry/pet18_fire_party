import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './chat.dto';

import { Request, Response } from 'express';
import { AuthGuard, REQ_COOKIE_SESSION } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('chat')
@UsePipes(new ValidationPipe({whitelist: true}))
export class ChatController {
  constructor(private readonly chatService: ChatService,
              private readonly userService: UserService) {}

  @Post()
  // @UseGuards(AuthGuard)
  create(@Body() createChatDto: CreateChatDto,@Req() req:Request) {
    const meToken = req.signedCookies[REQ_COOKIE_SESSION];
    if(!meToken) return;

    // const user = this.userService.findOneByToken(meToken);
    const user = this.userService.findOneBySession(meToken);
    if(!user) return;
    
    return this.chatService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatService.getAll();
  }

  @Get("me")
  // @UseGuards(AuthGuard)
  async getMyChats(@Req() req:Request){
    const session = req.signedCookies[REQ_COOKIE_SESSION];
    // console.log(`getMyChats(${meToken})`);
    if(!session) return;

    // const user = await this.userService.findOneByToken(meToken);
    const user = await this.userService.findOneBySession(session);
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
