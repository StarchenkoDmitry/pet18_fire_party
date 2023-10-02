import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule,UserModule, ChatModule, PrismaModule],
  controllers: [],
  providers: [],  
  exports:[]
})
export class AppModule {} 
 

//TODO: export prismaservice



    // {
    //   provide:APP_GUARD,
    //   useClass:MyAuthGuard
    // }
    // ,


  // exports:[AuthGuard],


  
    // {
    //   provide: APP_GUARD,
    //   useClass: MyAuthGuard,
    // },