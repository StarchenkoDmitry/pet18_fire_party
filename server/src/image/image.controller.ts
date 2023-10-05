import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from "express"

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get(':pubid')
  async findOne(@Param('pubid') pubid: string) {
    // console.log("/image/:pubid ", pubid);
    return await this.imageService.get(pubid);
  }

  @Get('buffer/:pubid')
  async test(@Param('pubid') pubid:string, @Res() res:Response) {
    // console.log("/image/test/:pubid ", pubid);
    const imgres =  await this.imageService.get(pubid);
    const buff = Buffer.from(imgres.buffer);
    return res.send(buff);
  }
}
