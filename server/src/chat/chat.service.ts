import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IMessage } from 'src/common/chat.interface';
import { IMyChat } from 'src/common/me.interface';

@Injectable()
export class ChatService {  
  constructor(private prisma: PrismaService) {
    console.log("constructor ChatService")
  }

  async create(id1:string,id2:string) {    
    const ress = await this.prisma.chat.create({
      data:{
        users:{
          connect:[{id:id1},{id:id2}]
        }
      },
    });
    return ress;
  }

  async get(chatId:string){
    return await this.prisma.chat.findFirst({
      where:{id:chatId},
      include:{
        users:true
      }
    })
  }
  
  async getMy(chatId:string,userId:string):Promise<IMyChat>{
    const data = await this.prisma.chat.findFirst({
      where:{id:chatId},
      include:{
        users:{
          where:{
            id:{
              not:userId
            }
          },
          select:{
            id:true,
            name:true,
            imageID:true,
          }
        },
      }
    })
    const {users, ...othData } = data
    if(users.length !== 1) throw ""
    return {...othData, user: users[0]}
  }

  async createMessage(userid:string, chatid:string,message:string) {
    const chat = await this.prisma.chat.findFirst({
      where:{
        id:chatid,
        AND:{
          users:{
            some:{
              id:userid
            }
          }
        }
      }
    });
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

  async getAllMessages(userid:string ,chatid:string):Promise<IMessage[] | undefined>{
    const chat = await this.prisma.chat.findFirst({
      where:{
        id:chatid,
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
      const messages:IMessage[] = [];
      let lastMessageID = chat.lastMessageID;
      let maxGetMessages = 256;
      while(lastMessageID && (maxGetMessages--) >0){
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

  async delete(id:string):Promise<boolean>{
    const curMes = await this.prisma.message.findFirst({where:{id:id}});
    if(!curMes) return false;
    // if(!curMes) throw new Error(`Message(id:${id}) is not exist!`)

    const prevMesID = curMes.prevMessageID;

    const nextMess = await this.prisma.message.findFirst({where:{prevMessageID:id}});
    if(!nextMess){
      //curMes Это последний message
      const curChat = await this.prisma.chat.findFirst({where:{lastMessageID:id}});
      if(!curChat) throw new Error("Chat не существует Это ошибка!!!")
      
      this.prisma.chat.update({data:{lastMessageID:prevMesID},where:{id:curChat.id}});
    }
    else{
      await this.prisma.message.update({data:{prevMessageID:prevMesID},where:{id:nextMess.id}});
    }

    const delres = await this.prisma.message.delete({where:{id:id}});    
    return delres !== null;
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