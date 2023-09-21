import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


const users = [{
    name:'dimka',
    password:'duck1'
},{
    name:'zena',
    password:'duck2'
}];


@Injectable()
export class AuthService {
  constructor(
    // private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    const user = users.find(u=>u.name === username);

    if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
        return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
        username: user.username, 
        sub: user.userId 
    };
    return {
        // access_token: this.jwtService.sign(payload),
    };
  }
}