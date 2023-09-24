import { BadRequestException, Body, Controller, Get, HttpException, NotFoundException, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { hasher } from './utils/Hasher';
import { Request, Response } from 'express';
import { AuthGuard, NotAuthGuard, REQ_KET_TOKEN } from './auth.guard';
import { CreateToken } from 'src/auth/utils/Tokener';
import { LoginStatus } from 'src/user/user.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth')
@UsePipes(new ValidationPipe({whitelist: true}))
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @UseGuards(new NotAuthGuard())
    async register(@Body() dto:SignUpDto, @Res({ passthrough: true }) res:Response){
        console.log("@register ", dto)
        const {password, ...ob} = dto; 

        const newToken = CreateToken();
        const createUserDto : CreateUserDto = {
            ...ob,
            passwordHash:hasher(password),
            token:newToken
        }

        const created = this.userService.create(createUserDto);
        if(created){ res.cookie(REQ_KET_TOKEN,createUserDto.token,{signed:true}); }

        return created;
    }   

    @Post('login')
    @UseGuards(new NotAuthGuard())
    async login(@Body() dto:LoginDto, @Res({ passthrough: true }) res:Response){
        const {status, token} = await this.userService.login(dto);
        if(status === LoginStatus.passwordWrong || status === LoginStatus.userNotFound){
            throw new HttpException("Error incorrect login or password",400);
        }
        if(token){ res.cookie(REQ_KET_TOKEN,token,{signed:true}); }        
    }

    @Get('logout')
    @UseGuards(new AuthGuard())
    async logout(@Res({ passthrough: true }) res:Response){
        console.log("logout");
        res.clearCookie(REQ_KET_TOKEN);
        return true;
    }
}