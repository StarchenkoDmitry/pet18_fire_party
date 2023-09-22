import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


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
      // users.push({
      //   login:createUserDto.login,
      //   passwordHash:createUserDto.passwordHash,
      //   email:createUserDto.email
      // });
      users.push({...createUserDto});
    }
    return !userRes;
  }


  async findOne(login: string):Promise<User>{
    return users.find(u=>u.login === login);
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
