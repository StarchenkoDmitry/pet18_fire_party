import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { hasher } from 'src/auth/utils/Hasher';
import { LoginResult, LoginStatus } from './user.interface';
import { CreateToken } from 'src/auth/utils/Tokener';
import { PrismaService } from 'src/prisma.service';

//test commite

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto):Promise<Boolean> {
    const userRes = await this.prisma.user.findFirst({where:{login: createUserDto.login}});

    if(!userRes){
      const created = await this.prisma.user.create({data:{
        ...createUserDto,
      }})
    }

    return !userRes;
  }

  async findAll():Promise<User[]>{
    const userss = await this.prisma.user.findMany();

    return userss.map(u=>{
      const {id,...userok} = u;
      return userok as User;
    })
  }

  async findOne(login: string):Promise<User>{
    return this.prisma.user.findFirst({where:{login:login}})
  }  

  async login(dto:LoginDto):Promise<LoginResult>{
    const user = await this.prisma.user.findFirst({where:{login:dto.login}})

    if(!user) return {status:LoginStatus.userNotFound};

    const passwordHash = await hasher(dto.password);
    if(user.passwordHash !== passwordHash){
      return {status:LoginStatus.passwordWrong};
    }    
    user.token = CreateToken();

    await this.prisma.user.update({where:{id:user.id},data:{token:user.token}});

    return {status:LoginStatus.ok,token:user.token};
  }
}
