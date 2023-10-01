import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports:[],
  controllers: [UserController],
  providers: [UserService,PrismaService],
  exports:[UserService]
})
export class UserModule {}
