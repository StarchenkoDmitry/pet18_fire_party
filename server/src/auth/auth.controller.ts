import { Body, Controller, Get, HttpException, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { hasher } from './utils/Hasher';
import { Request, Response } from 'express';
import { LoginStatus } from 'src/user/user.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard, COOKIE_SESSION } from './auth.guard';
import { GenerateSession } from './utils/Session';
import { UserDec } from './auth.decorator';
import { User } from '@prisma/client';


@Controller('auth')
@UsePipes(new ValidationPipe({whitelist: true}))
export class AuthController {
    constructor(private readonly userService: UserRepository) {}

    @Post('register')
    async register(@Body() dto:SignUpDto, @Res({ passthrough: true }) res:Response){
        console.log("@register ", dto)
        const {password, ...ob} = dto;

        const newSessionID = GenerateSession();
        const createUserDto : CreateUserDto = {
            ...ob,
            passwordHash:hasher(password),
            session:newSessionID
        }

        const created = this.userService.create(createUserDto);
        if(created){ res.cookie(COOKIE_SESSION,createUserDto.session,{signed:true}); }

        return created;
    }

    @Post('login')
    async login(@Body() dto:LoginDto, @Res({ passthrough: true }) res:Response){
        const {status, session } = await this.userService.login(dto);
        if(status === LoginStatus.passwordWrong || status === LoginStatus.userNotFound){
            throw new HttpException("Error incorrect login or password",400);
        }else if(session){
            res.cookie(COOKIE_SESSION,session,{signed:true});
        }
    }

    @Get('logout')
    @UseGuards(AuthGuard)
    async logout(@Res({ passthrough: true }) res:Response,@UserDec() user:User){
        console.log("@logout");
        //TODO: удалить session из базы данных User
        const isDone = await this.userService.logout(user.session);
        if(isDone) res.clearCookie(COOKIE_SESSION);
        return true;
    }
}
