import { Controller, Get, Post, Param, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';
import { UserDec } from 'src/auth/auth.decorator';
import { User } from '@prisma/client';

import { Response } from "express"
import { ExpressFIle } from 'src/image/image.interface';
import { IUserForMe } from 'src/common/user.interface';

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
  getMe(@UserDec() user:User):IUserForMe {
    // console.log("user/me");
    const me: IUserForMe = {
      id:user.id,
      name:user.name,
      surname:user.surname,
      imageID:user.imageID,
      email:user.email,
      login:user.login
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


  
  @Get('buffer/:id')
  async test(@Param('id') id:string, @Res() res:Response) {
    console.log("/image/buffer/:id ", id);
    const imgres =  await this.imageService.get(id);
    if(!imgres)return
    const buff = Buffer.from(imgres.buffer);
    return res.send(buff);
  }

  @Get("avatarBlob")
  @UseGuards(AuthGuard)
  async getMyAvatar(@UserDec() user:User, @Res() res:Response) {
    console.log("/user/avatarBlob");
    if(!user.imageID){
      res.status(204).send(undefined);//.json({error:"I have not a avatar"});
      return;
    }
    const myImage =  await this.imageService.get(user.imageID);
    if(!myImage){
      res.status(204).send(undefined);
      return;
    }
    const imageBuffer = Buffer.from(myImage.buffer);
    res.status(200).send(imageBuffer);
  }

  @Post("avatarBlob")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async setMyAvatar(@UploadedFile() file: Express.Multer.File, @UserDec() user:User){
    console.log("[POST] user/avatarBlob file:",file);

    const newImage : ExpressFIle = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      buffer:file.buffer,
      size: file.size
    };

    if(user.imageID){
      const resUpdate = await this.imageService.update(user.imageID,newImage);
      console.log("[POST] user/avatarBlob resUpdate:",resUpdate);
      return user.imageID;
    }else{
      const resImage = await this.imageService.create(newImage);
      const resChanged = await this.userService.changeImage(user.id,resImage.id);    
      return resChanged ? resImage.id : undefined;
    }
  }
}
