import { Body, Controller, Get, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';



@Controller('auth')
export class AuthController {
    // constructor(readonly authService: AuthService){}
    constructor(private readonly userService: UserService) {}


    //TODO: Доделать волидацию данных проверить длину password и логина. 
    @Post('login')
    async login(@Body(new ValidationPipe()) dto:LoginDto, @Req() req:Request){        
        // console.log("Login ",req.cookies);
        // console.log("Dto: ",dto);
        

        return true;
    }

    @Get('logout')
    async logout(){


        return true;
    }
}
