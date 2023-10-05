import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChatDto } from './chat.dto';
import { Chat } from '@prisma/client';
import { ChatInfo, Message } from 'src/common/inerfaces';

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

  async createMessage(userid:number, chat_pubid:string,message:string) {
    const chat = await this.prisma.chat.findFirst({
      where:{
        pubid:chat_pubid,
        AND:{
          users:{
            some:{
              id:userid
            }
          }
        }
      }
    });
    // console.log("messes: ",chat);
    if(chat){
      const newMessage = await this.prisma.message.create({
        data:{
          text:message,
          userID:userid,
          prevMessageID:chat.lastMessageID
        }
      });      

      const lastMessageID = chat.lastMessageID;
      await this.prisma.chat.update({
        where:{id:chat.id},
        data:{
          lastMessageID: newMessage.id
        }
      });
      return true;
    }    
    return false;
  }

  async getAllMessages(userid:number ,chat_pubid:string):Promise<Message[] | undefined>{
    const chat = await this.prisma.chat.findFirst({
      where:{
        pubid:chat_pubid,
        AND:{
          users:{
            some:{
              id:userid
            }
          }
        }
      }
    })
    if(chat){
      const messages:Message[] = [];
      let lastMessageID = chat.lastMessageID;
      let maxGetMessages = 256;
      while(lastMessageID && lastMessageID !== 0 && (maxGetMessages--) >0){
        const message = await this.prisma.message.findFirst({
          where:{id:lastMessageID}
        });
        if(!message){
          lastMessageID = null;
          continue;
        }
        messages.push({
          id:message.id,
          text:message.text,
          createAt: message.createAt,
          prevMessageID: message.prevMessageID
        })
        lastMessageID = message.prevMessageID;
      }
      return messages;
    }
    return;
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