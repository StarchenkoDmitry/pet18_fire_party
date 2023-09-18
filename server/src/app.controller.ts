import { Body, Controller, Get, Param, Post, RawBodyRequest, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
  // @Post()
  // async login(@Body("login") login:string,@Body("password") password:string) {
  //   console.log(`login-> (${login},${password})`);
  //   return true;
  // }


  // @Post('loginform')
  // @UseInterceptors(FileInterceptor(''))
  // signup(@UploadedFile() file, @Body() body) {
  //   // console.log(file);
  //   console.log(body);
  // }

  @Post('loginform')
  @UseInterceptors(FileInterceptor(''))
  signup(@Body('email') email) {
    // console.log(file);
    console.log(email);
  }
  


  // @Post()
  // async login(@Body() body) {
  //   console.log(`login-> `,body)
  //   return true; 
  // }
  
  // @Post()
  // async login(@UploadedFile() flefsdf) {
  //   console.log(`flefsdf -> `,flefsdf)
  //   return true; 
  // }

  //this is work.
  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async login(@Body('login') body) {
  //   console.log(`login-> `,body)
  //   return true; 
  // }


  // @Post()
  // create(@Req() req: RawBodyRequest<Request>) {
  //   const raw = req.rawBody; // returns a `Buffer`.
  //   console.log(`raw -> `,raw)
  // }
}
