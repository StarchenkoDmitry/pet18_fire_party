import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { hasher } from 'src/auth/utils/Hasher';
import { LoginResult, LoginStatus } from './user.interface';
import { CreateToken } from 'src/auth/utils/Tokener';


let users: User[] = [{
  login:'dima',
  passwordHash:'duck1',
  email:"lol",
},{
  login:'zena',
  passwordHash:'duck2',
  email:"lol",
}];




@Injectable()
export class UserService {

  
  async create(createUserDto: CreateUserDto):Promise<Boolean> {
    const userRes = users.find(u=>u.login === createUserDto.login);

    if(!userRes){
      users.push({...createUserDto});
    }
    return !userRes;
  }


  async findOne(login: string):Promise<User>{
    return users.find(u=>u.login === login);
  }

  async login(dto:LoginDto):Promise<LoginResult>{
    const user = users.find(u=>u.login === dto.login);

    if(!user) return {status:LoginStatus.userNotFound};

    const passwordHash = await hasher(dto.password);
    if(user.passwordHash !== passwordHash){
      return {status:LoginStatus.passwordWrong};
    }
    
    user.token = CreateToken();

    return {status:LoginStatus.ok,token:user.token};
  }
}
