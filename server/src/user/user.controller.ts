import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @Get('all')
  @UseGuards(AuthGuard)
  getAll() {
    console.log("@getAll")
    return this.userService.findAll();
  }

  @Get(["findAllByName",'findAllByName/:text'])
  @UseGuards(AuthGuard)
  async findAllByName(@Param("text") text:string){
    console.log(`findAllByName/:text text: ${text}`);
    // if(!text)text= "";
    return await this.userService.findAllByName(text);
  }

  // @Get('id/:id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch('id/:id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete('id/:id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
