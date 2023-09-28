import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChatDto } from './chat.dto';

@Injectable()
export class ChatService {  
  constructor(private prisma: PrismaService) {}

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  getAll() {
    return this.prisma.chat.findMany();
  }
}
