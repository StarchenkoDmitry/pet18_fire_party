import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IMessage } from 'src/common/chat.interface';
import { IMyChat } from 'src/common/me.interface';
import { Chat, Message } from '@prisma/client';
import { constants } from 'buffer';
import { IChatIncludeUsers } from './chat.interface';

@Injectable()
export class ChatRepository {  
  constructor(private prisma: PrismaService) {
    console.log("constructor ChatRepository")
  }

  async create(userId:string,friendId:string) {
    if(userId === friendId){
      throw "You can not to create a chat with yourself"
    }

    const chat = await this.prisma.chat.findFirst({
      where:{
        AND:[{
          users:{
            some:{
              id:userId
            }
          }
        },{
          users:{
            some:{
              id:friendId
            }
          }
        }]
      }
    })
    
    if(chat){
      console.log(`ChatRepository create(${userId}, ${friendId}) error chat is exist.`)
      console.log("Chat: ",chat)
      return
    }

    const newChat = await this.prisma.chat.create({
      data:{
        users:{
          connect:[{id:userId},{id:friendId}]
        }
      },
    })
    return newChat
  }

  async getIncludeUsers(chatId:string):Promise<IChatIncludeUsers>{
    return await this.prisma.chat.findFirst({
      where:{id:chatId},
      include:{
        users:true
      }
    })
  }
  
  async getMy(chatId:string,userId:string):Promise<IMyChat>{
    // console.log("getMy chatId, userId:",chatId,userId)
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

  async createMessage(chatId:string, userId:string, text:string):Promise<Message> {
    const chat = await this.prisma.chat.findFirst({
      where:{
        id:chatId,
        AND:{
          users:{
            some:{
              id:userId
            }
          }
        }
      }
    });    
    if(chat){
      //TODO: сделать транзакцию.
      const newMessage = await this.prisma.message.create({
        data:{
          text:text,
          chatId:chatId,
          userID:userId,
          prevMessageID:chat.lastMessageID,
        }
      });      

      const lastMessageID = chat.lastMessageID;
      await this.prisma.chat.update({
        where:{id:chat.id},
        data:{
          lastMessageID: newMessage.id
        }
      });
      return newMessage;
    }
    return
  }

  async getAllMessages(chatid:string, userid:string):Promise<IMessage[]>{
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
          prevMessageID: message.prevMessageID,
          chatId: message.chatId,
          userId: message.userID
        })
        lastMessageID = message.prevMessageID;
      }
      return messages;
    }
    return;
  }

  async getAll():Promise<Chat[]> {
    return this.prisma.chat.findMany();
  }

  // async getChatFromMessage(messageId:string,userId:string)

  async removeMessage(chatId:string,messageId:string,userId:string):Promise<boolean>{
    // const message = await this.prisma.message.findFirst({
    //   where:{
    //     id:messageId,
    //     onChat:{
    //       some:{
    //         id:chatId,
    //         users:{
    //           some:{
    //             id:userId
    //           }
    //         }
    //       }
    //     }
    //   },
    //   include:{
    //     nextMessage:true
    //   }
    // })
    

    //TODO: доделать проверку, что это сообщение есть в том чате где есть наш пользователь
    const message = await this.prisma.message.findFirst({
      where:{
        id:messageId,
      },
      include:{
        nextMessage:true
      }
    })

    if(!message){
      console.error(`ChatRepository removeMessage(${chatId}, ${messageId}, ${userId}) message is not exist`)
      return false;
    }

    if(message.nextMessage.length > 1){
      console.error(`ChatRepository removeMessage messageId(${message.id}): ${message} (lenght > 1) nextMessage[${message.nextMessage}]`)
      return false;
    }


    const nextMessageId = message.nextMessage.length === 1 ? message.nextMessage[0].id : null
    const prevMessageId = message.prevMessageID
    console.log("nextMessageId, prevMessageID: ",nextMessageId,prevMessageId)
    if(nextMessageId){
      if(prevMessageId){
        const resNextMessage = await this.prisma.message.update({
          data:{
            prevMessageID: prevMessageId
          },
          where:{
            id: nextMessageId
          }
        })
      }
      else{
        const resMess = await this.prisma.message.update({
          data:{
            prevMessageID: null
          },
          where:{
            id: nextMessageId
          }
        })
      }
    }
    else{
      if(prevMessageId){
        const resChadft = await this.prisma.chat.update({
          data:{
            lastMessageID: prevMessageId
          },
          where:{
            id: chatId
          }
        })
      }
      else{
        const resChadft = await this.prisma.chat.update({
          data:{
            lastMessageID: null
          },
          where:{
            id: chatId
          }
        })
      }
    }

    const deletedMessage = await this.prisma.message.delete({
      where:{
        id:messageId
      }
    })
    return true;
  }
}
