import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports:[PrismaModule,ImageModule],
  controllers: [UserController],
  providers: [UserRepository],
  exports:[UserRepository]
})
export class UserModule {}
 