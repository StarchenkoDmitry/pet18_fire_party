import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChatDto } from './chat.dto';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatService {  
  constructor(private prisma: PrismaService) {}

  create(createChatDto: CreateChatDto) {
    
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
