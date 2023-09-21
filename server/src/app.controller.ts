import { Body, Controller, Get, Param, Post, RawBodyRequest, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './auth/jwt/jwt.auth.guard';
import { AuthService } from './auth/auth.service';
import { LoggingInterceptor } from './logging.interceptor';


// @UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('loginform')
  @UseInterceptors(FileInterceptor(''))
  signup(@Body('email') email) {
    // console.log(file);
    console.log(email);
  }
  


  @Get('users')
  async getUsers(@Req() request: Request) {
    // console.log(request.cookies('foo'));
    // res.
    console.log(request.headers.cookie)
    return ['user1','user2'];
  }


  @UseGuards(JwtAuthGuard)
  @Post('jwtlogin')
  async login(@Req() req) {
    // return this.authService.login(req.user);
    console.log("JwtLogin user: ",req.user);
    if(req.user)
      return this.authService.login(req.user);
    else{
      return {message:"LOL"};
    }  
  }


  // @Post('login2')
  // async login2() {
  //   console.log("login2=>");
  //   return {message:"LOL2222"};
  // }


  @Post('login2')
  async login2(@Req() request: Request) {
    console.log("login2=>");
    console.log("l: ",request.cookies)
    return {message:"LOL2222"};
  }
}
