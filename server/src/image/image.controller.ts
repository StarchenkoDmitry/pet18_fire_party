import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from "express"

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':id')
  async findOne(@Param('pubid') id: string) {
    // console.log("/image/:id ", pubid);
    return await this.imageService.get(id);
  }

  @Get('buffer/:id')
  async test(@Param('id') id:string, @Res() res:Response) {
    // console.log("/image/test/:id ", id);
    const imgres =  await this.imageService.get(id);
    if(!imgres)return
    const buff = Buffer.from(imgres.buffer);
    return res.send(buff);
  }
}
