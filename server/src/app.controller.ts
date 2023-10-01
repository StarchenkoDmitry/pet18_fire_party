import {Controller, Get, UseGuards} from '@nestjs/common';
import { MyAuthGuard } from './auth/auth.guard';
import { MyAuthGuardApp } from './auth.guard';
import { PrismaService } from './prisma.service';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
    constructor(private readonly userService: AppService) {}
    @Get()
    @UseGuards(MyAuthGuardApp)
    getAll() {
      console.log("@getAll ")
      return "DFDFDF";
    }
  
}
