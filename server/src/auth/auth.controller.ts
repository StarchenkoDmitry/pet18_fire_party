import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';



@Controller('auth')
export class AuthController {
    constructor(readonly authService: AuthService){}

    @Post('login')
    async login(@Req() req:Request){
        console.log("Login ",req.cookies);
        

        return Math.random().toString();
    }

    @Get('logout')
    async logout(){

    }
}
