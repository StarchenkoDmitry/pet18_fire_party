import { BadRequestException, Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { hasher } from './utils/Hasher';



@Controller('auth')
export class AuthController {
    // constructor(readonly authService: AuthService){}
    constructor(private readonly userService: UserService) {}


    //TODO: Доделать волидацию данных проверить длину password и логина. 
    @Post('login')
    async login(@Body(new ValidationPipe()) dto:LoginDto){        
        const user = await this.userService.findOne(dto.login)
        const passwordHash = await hasher(dto.password);

        if(user.passwordHash === passwordHash){
            return {
                ok:"ok"
            }
        }else{
            throw new BadRequestException({bob:124},{cause:"TILOX"})
        }
    }

    @Get('logout')
    async logout(){


        return true;
    }
}
