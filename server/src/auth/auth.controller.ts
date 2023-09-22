import { BadRequestException, Body, Controller, Get, NotFoundException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { hasher } from './utils/Hasher';


@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() dto:SignUpDto){
        const {password, ...ob} = dto;

        const created = this.userService.create({
            ...ob,
            passwordHash:hasher(password)
        });

        return created;
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() dto:LoginDto){        
        const user = await this.userService.findOne(dto.login)
        const passwordHash = await hasher(dto.password);

        if(!user){
            throw new NotFoundException({error:"User not found."});            
        }

        console.log(`login: userPass(${user.passwordHash}) pass(${passwordHash})`)

        if(user.passwordHash === passwordHash){
            return {
                ok:"ok"
            }
        }else{
            throw new BadRequestException({error:"не правильный password"})
        }
    }

    @Get('logout')
    async logout(){
        return true;
    }
}
