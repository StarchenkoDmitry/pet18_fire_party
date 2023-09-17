import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  @Post()
  async login(@Body("login") login:string,@Body("password") password:string) {
    console.log(`login-> (${login},${password})`)
    return true;
    // return this.todoService.update(id, body.text);
  }
}
