import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    constructor(readonly authService: AuthService){}

    @Post('login')
    async login(){

    }

    @Get('logout')
    async logout(){

    }
}
