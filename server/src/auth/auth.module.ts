import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService,UserService,PrismaService],
  // exports: [AuthService],
})
export class AuthModule {}