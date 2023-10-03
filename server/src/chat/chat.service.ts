import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './chat.dto';
import { Chat } from '@prisma/client';
import { ChatInfo } from 'src/common/inerfaces';

@Injectable()
export class ChatService {  
  constructor(private prisma: PrismaService) {}

  async create(pubid1:string,pubid2:string) {    
    const ress = await this.prisma.chat.create({
      data:{
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

  async getMyChats(userid:number):Promise<ChatInfo[]>{
    const mechats: Chat[] = await this.prisma.chat.findMany({
      where:{
        users:{
          some:{
            id:userid
          }
        }
      }
    });
    
  //   var results: number[] = await Promise.all(arr.map(async (item): Promise<number> => {
  //     await callAsynchronousOperation(item);
  //     return item + 1;
  // }));

    const list_chatInfo : ChatInfo[] = await Promise.all(mechats.map(async (e)=>{
      const {id,...obj} = e;
      const users = await this.prisma.user.findMany({
        where:{chats:{
          some:{
            pubid:obj.pubid
          }
        }}
      });

      return {...obj,users:users.map(e=>{
        return {pubid:e.pubid,name:e.name};
      })};
    }));

    return list_chatInfo;
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