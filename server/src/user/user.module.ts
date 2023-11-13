import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageModule } from 'src/image/image.module';
import { UserService } from './user.service';

@Module({
  imports:[PrismaModule,ImageModule],
  controllers: [UserController],
  providers: [UserRepository,UserService],
  exports:[UserRepository,UserService]
})
export class UserModule {}
 