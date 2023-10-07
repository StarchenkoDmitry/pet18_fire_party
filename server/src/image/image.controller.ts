import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from "express"
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('raw/:id')
  async findOne(@Param('id') id: string) {
    // console.log("/image/:id ", pubid);
    return await this.imageService.get(id);
  }

  @Get('buffer/:id')
  async test(@Param('id') id:string, @Res() res:Response) {
    console.log("/image/buffer/:id ", id);
    const imgres =  await this.imageService.get(id);
    if(!imgres)return
    const buff = Buffer.from(imgres.buffer);
    return res.send(buff);
  }


  @Get("allid")
  async getAllID():Promise<string[]> {
    console.log("/image/allid");
    return (await this.imageService.getMany()).map(e=>{
      return e.id;
    });
  }

  @Post("update/:id")
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(@UploadedFile() file: Express.Multer.File,@Param('id') id: string) {
    console.log("image/update/:id");
    const {originalname, mimetype, buffer, size } = file;
    const res_img = await this.imageService.update(id,{originalname, mimetype, buffer, size});
    
    return res_img !== null;
  }
}

