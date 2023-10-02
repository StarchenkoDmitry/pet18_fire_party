import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './chat.dto';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatService {  
  constructor(private prisma: PrismaService) {}

  async create(pubid1:string,pubid2:string) {
    
    const ress = await this.prisma.chat.create({
      data:{
        nameChat:"LOLCHAT",
        users:{
          connect:[{pubid:pubid1},{pubid:pubid2}]
        }
      },
    });
    return ress;    
  }

  getAll() {
    return this.prisma.chat.findMany();
  }

  async getMyChats(userid:number){
    const mechats: Chat[] = await this.prisma.chat.findMany({
      where:{
        users:{
          some:{
            id:userid
          }
        }
      }
    });
    return mechats;
  }
}


//TODO: потом проверить Добавление нового учасника в чат
// const dfd = await this.prisma.chat.update({
//   where:{id:5},
//   data:{
//     users:{
//       connect:{pubid:""}
//     }
//   }
// })