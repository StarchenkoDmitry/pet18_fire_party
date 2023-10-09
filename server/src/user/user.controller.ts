import { Controller, Get, Post, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { UserDec } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';
import { IMe } from 'src/common/me.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService
  ) {}

  @Get('all')
  @UseGuards(AuthGuard)
  getAll() {
    // console.log("user/all");
    return this.userService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@UserDec() user:User) {
    // console.log("user/me");
    const me: IMe = {
      id:user.id,
      name:user.name,
      surname:user.surname,
      imageID:user.imageID
    };
    return me;
  }

  @Get(["findAllByName",'findAllByName/:text'])
  @UseGuards(AuthGuard)
  async findAllByName(@Param("text") text:string){
    // console.log(`user/findAllByName/:text text: ${text}`);
    return await this.userService.findAllByName(text);
  }
  
  @Post('img')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File,@UserDec() user:User) {
    // console.log("user/img");
    const {originalname, mimetype, buffer, size } = file;
    const res_img = await this.imageService.create({originalname, mimetype, buffer, size});
    if(res_img){
      const res_changed = await this.userService.changeImage(user.id,res_img.id);
      return res_changed ? res_img.id : undefined;
    }
    else return;
  }


}
