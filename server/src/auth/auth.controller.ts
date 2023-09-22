import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { hasher } from './utils/Hasher';
import { Request, Response } from 'express';
import { AuthGuard, REQ_KET_TOKEN } from './auth.guard';
import { SessionRandom } from 'src/auth/utils/SessionRandom';


@Controller('auth')
@UsePipes(new ValidationPipe({whitelist: true}))
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() dto:SignUpDto, @Res({ passthrough: true }) res:Response){
        const {password, ...ob} = dto;

        const newToken = SessionRandom();
        const createUserDto = {
            ...ob,
            passwordHash:hasher(password),
            token:newToken
        }

        const created = this.userService.create(createUserDto);
        if(created){
            res.cookie(REQ_KET_TOKEN,createUserDto.token,{signed:true});
        }

        return created;
    }

    @Post('login')
    // @UseGuards(new AuthGuard())
    async login(@Body() dto:LoginDto, @Res({ passthrough: true }) res:Response){
        const user = await this.userService.findOne(dto.login);

        if(!user) throw new NotFoundException({error:"User not found."});

        const passwordHash = await hasher(dto.password);
        // console.log(`login: userPass(${user.passwordHash}) pass(${passwordHash})`)

        // if(user.passwordHash !== passwordHash) throw new BadRequestException({error:"не правильный password"});
        
        res.cookie(REQ_KET_TOKEN,Math.random().toString(),{});

        return Math.random().toString();
    }

    @Get('logout')
    async logout(){
        return true;
    }
}



        // console.log("Coolies req: ",req.cookies);