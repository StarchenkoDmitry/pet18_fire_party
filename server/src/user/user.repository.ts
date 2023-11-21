import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { hasher } from 'src/auth/utils/Hasher';
import { LoginResult, LoginStatus } from './user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { GenerateSession } from 'src/auth/utils/Session';
import { IMyChat } from 'src/common/me.interface';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {
    console.log("constructor UserRepository")
  }

  async get(userId:string):Promise<User>{
    try {
      return await this.prisma.user.findFirst({
        where:{id:userId}
      })
    } catch (error) {
      console.error(error)
      return
    }
  }
  
  async create(createUserDto: CreateUserDto):Promise<Boolean> {    
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

  async changeImage(userID:string,imageID:string):Promise<boolean>{    
    try {
      const res = await this.prisma.user.update({
        data:{ 
          imageID: imageID
        },
        where:{ 
          id: userID
        }
      });
      // console.log("changeImg res: ",res);
      return true
    } catch (error) {
      console.log("UserService changeImg error: ",error);
      return false
    }
  }

  async findManyByName(name:string,limit:number = 16):Promise<User[]>{
    try {
      const users = await this.prisma.user.findMany({
        take:limit,
        where:{
          name:{
            contains:name
          }
        }
      })
      return users
    } catch (error) {
      console.error("findManyByName error:",error)
    }
  }

  async findManyByNameWhoNoFriend(userId:string,name:string,limit:number = 16):Promise<User[]>{
    try {
      const users = await this.prisma.user.findMany({
        take:limit,
        where:{
          name:{
            contains:name
          },
          id:{
            not:userId
          },
          NOT:{
            chats:{
              some:{
                users:{
                  some:{
                    id:userId
                  }
                }
              }
            }
          }          
        },
      })
      return users
    } catch (error) {
      console.error("findManyByName error:",error)
    }
  }

  async findOne(login: string):Promise<User>{
    return await this.prisma.user.findFirst({where:{login:login}})
  }

  async findOneBySession(session: string):Promise<User>{
    return await this.prisma.user.findFirst({where:{session:session}})
  }

  async getMyChats(userId: string):Promise<IMyChat[]>{
    const chats = await this.prisma.user.findFirst({
      where:{id:userId},
      select:{
        chats:{
          include:{
            users:{
              where:{
                id:{
                  not:userId
                }
              },
              select:{
                id:true,
                name:true,
                imageID:true,
              }
            }
          }
        }
      }
    })

    if(!chats)return;

    const meChats: IMyChat[] = chats.chats.map(chat=>{
      if(chat.users.length !== 1) 
        throw Error("[UserService.getMyChats] lenght of users is not one (1).");
      return {
        id: chat.id,
        lastMessageID: chat.lastMessageID,
        user: chat.users[0]
      }
    })
    return meChats;
  }

  async getMyFriends(userId:string){
    const friendsId = await this.prisma.user.findMany({
      where:{
        chats:{
          some:{
            users:{
              some:{
                id:userId
              }
            }
          }
        },
        NOT:{
          id:userId
        }
      },
      select:{
        id:true,
      }
    })
    // console.log("UserRepository user: ",userId)
    // console.log("UserRepository getMyFriends: ",friendsId)
    return friendsId.map(f=>{return f.id})
  }

  async login(dto:LoginDto):Promise<LoginResult>{
    const user = await this.prisma.user.findFirst({where:{login:dto.login}})

    if(!user) return {status:LoginStatus.userNotFound};

    const passwordHash = await hasher(dto.password);
    if(user.passwordHash !== passwordHash){
      return {status:LoginStatus.passwordWrong};
    }    
    user.session = GenerateSession();

    await this.prisma.user.update({where:{id:user.id},data:{session:user.session}});

    return {
      status:LoginStatus.ok,
      session:user.session
    };
  }

  async logout(session:string):Promise<boolean>{
    try {
      //TODO: заменить UpdateMany на update когда я сделаю session Unique
      const user = await this.prisma.user.updateMany({
        data:{
          session:null,
        },
        where:{
          session:session
        }
      });
    } catch (error) {
      return false;
    }
  }

  async setName(userId:string,name:string | null){
    try {
      const res = await this.prisma.user.update({
        where:{
          id:userId,
        },
        data:{
          name:name
        }
      })
      return res
    } catch (error) {
      console.error(error)
      return
    }
  }

  async setSurname(userId:string,surname:string | null){
    try {
      const res = await this.prisma.user.update({
        where:{
          id:userId,
        },
        data:{
          surname:surname
        }
      })
      return res
    } catch (error) {
      console.error(error)
      return
    }
  }
}
