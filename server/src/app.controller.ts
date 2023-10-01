import {Controller, Get, UseGuards} from '@nestjs/common';
import { MyAuthGuard } from './auth/auth.guard';

@Controller('app')
export class AppController {
  
    @Get()
    // @UseGuards(MyAuthGuard)
    getAll() {
      console.log("@getAll ")
      return "DFDFDF";
    }
  
}
