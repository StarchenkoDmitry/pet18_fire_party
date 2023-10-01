import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ChatModule } from './chat/chat.module';
import { MyAuthGuard } from './auth/auth.guard';
import { UserService } from './user/user.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, UserModule, ChatModule],
  controllers: [AppController],
  providers: [AppService,PrismaService,
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard,
    },
  ],
  
  exports:[PrismaService]
  // exports:[AuthGuard],
})
export class AppModule {} 
 

//TODO: export prismaservice