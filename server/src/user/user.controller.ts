import { Controller, Get, Post, Body, Patch, Param, Delete, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsString } from 'class-validator';
import { MyAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
 
  @Get()
  // @UseGuards(MyAuthGuard)
  getAll(@Session() ses) {
    console.log("@getAll ",ses)
    return this.userService.findAll();
  }


  @Get('findAllByName/:text')
  async findAllByName(@Param("text") text:string){
    console.log(`findAllByName/:text text: ${text}`);

    return await this.userService.findAllByName(text);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
