import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule,UserModule, ChatModule],
  controllers: [],
  providers: [PrismaService],  
  exports:[PrismaService]
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