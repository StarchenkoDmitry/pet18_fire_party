import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { hasher } from 'src/auth/utils/Hasher';
import { LoginResult, LoginStatus } from './user.interface';
import { CreateToken } from 'src/auth/utils/Tokener';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { generateSession } from 'src/auth/auth.guard';

// import { User, User as UserDB } from "@prisma/client"
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto):Promise<Boolean> {
    
    // this.prisma.user.create({data:{chats:{}}});
    // await this.prisma.chat.create({data:{
    //   nameChat:"dimka",
    //   users:{create:[{
    //     email:"5325",
    //     login:"346346",
    //     passwordHash:"546547",
    //   }]},
    // }});
    // this.prisma.user.findFirst({where:{ id:0}});

    try {      
      const userRes = await this.prisma.user.findFirst({where:{login: createUserDto.login}});

      if(!userRes){
        const created = await this.prisma.user.create({data:{
          ...createUserDto,
        }})
      }

      return !userRes;
    } catch (error) {
      console.log("UserService->create error: ",error);
      return false;
    }
  }

  async findAll():Promise<User[]>{
    const users = await this.prisma.user.findMany();

    return users.map(u=>{
      const {id,...userok} = u;
      return userok as User;
    })
  }


  async findAllByName(text:string,lemit:number = 10):Promise<User[]>{
    const userss = await this.prisma.user.findMany({
      where:{
        login:{
          contains:text
        }
      }
    });

    return userss.map(u=>{
      const {id,...userok} = u;
      return userok as User;
    })
  }

  async findOne(login: string):Promise<User>{
    return this.prisma.user.findFirst({where:{login:login}})
  }  
  

  // async findOneByToken(token: string):Promise<User>{
  //   return this.prisma.user.findFirst({where:{token:token}})
  // }


  async findOneBySession(session: string):Promise<User>{
    return this.prisma.user.findFirst({where:{session:session}})
  }


  async login(dto:LoginDto):Promise<LoginResult>{
    const user = await this.prisma.user.findFirst({where:{login:dto.login}})

    if(!user) return {status:LoginStatus.userNotFound};

    const passwordHash = await hasher(dto.password);
    if(user.passwordHash !== passwordHash){
      return {status:LoginStatus.passwordWrong};
    }    
    user.session = generateSession();

    await this.prisma.user.update({where:{id:user.id},data:{session:user.session}});

    return {
      status:LoginStatus.ok,
      token:user.session
    };
  }

  // async login(dto:LoginDto):Promise<LoginResult>{
  //   const user = await this.prisma.user.findFirst({where:{login:dto.login}})

  //   if(!user) return {status:LoginStatus.userNotFound};

  //   const passwordHash = await hasher(dto.password);
  //   if(user.passwordHash !== passwordHash){
  //     return {status:LoginStatus.passwordWrong};
  //   }    
  //   user.token = CreateToken();

  //   await this.prisma.user.update({where:{id:user.id},data:{token:user.token}});

  //   return {status:LoginStatus.ok,token:user.token};
  // }


}
