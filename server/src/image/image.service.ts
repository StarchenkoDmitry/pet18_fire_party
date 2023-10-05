import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpressFIle } from './image.interface';
import { Image } from '@prisma/client';



@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {
    console.log("constructor ImageService")
  }

  async create(file:ExpressFIle):Promise<Image>{
    const res = await this.prisma.image.create({
      data:{
        ...file,
      }
    });
    return res;
  }
  async get(pubid:string) {
    return await this.prisma.image.findFirst({ where:{pubid:pubid} });
  }
  
  // remove(id: number) {
  //   return `This action removes a #${id} image`;
  // }
}
