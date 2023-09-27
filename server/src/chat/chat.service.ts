import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma.service';

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
