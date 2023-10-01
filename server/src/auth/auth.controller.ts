import { BadRequestException, Body, CanActivate, Controller, ExecutionContext, Get, HttpException, Injectable, NotFoundException, Post, Req, Res, Session, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { hasher } from './utils/Hasher';
import { Request, Response } from 'express';
import { CreateToken } from 'src/auth/utils/Tokener';
import { LoginStatus } from 'src/user/user.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MyAuthGuard, REQ_COOKIE_SESSION } from './auth.guard';
import { AuthService } from './auth.service';










export const REQ_KEY_SESSION = "session";//"session";
@Injectable()
export class MyAuthGuardAuth implements CanActivate {
  constructor(private readonly userService: UserService) {
    console.log("INIT MyAuthGuard")
  }

  async canActivate(context: ExecutionContext): Promise<boolean>{
    try{
      const request:Request = context.switchToHttp().getRequest();
      // console.log("DoAuthUser cookies: ",request.signedCookies);
      const session = request.signedCookies[REQ_COOKIE_SESSION];
      request[REQ_KEY_SESSION] = session;      
      console.log("DoAuthUserApp session: ",session);
      
      return true;

    }catch(error){
      console.log("Error: ",error);
      return false;
    }
  }
}








@Controller('auth')
@UsePipes(new ValidationPipe({whitelist: true}))
export class AuthController {
    // constructor(   @Inject(forwardRef(() => UserService)) private userService: UserService) {}
    constructor(private readonly fdfdg : AuthService,
        private readonly userService: UserService) {}

    @Post('register')
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
        if(created){ res.cookie(REQ_COOKIE_SESSION,createUserDto.token,{signed:true}); }

        return created;
    }

    @Post('login')
    async login(@Body() dto:LoginDto, @Res({ passthrough: true }) res:Response){
        const {status, token} = await this.userService.login(dto);
        if(status === LoginStatus.passwordWrong || status === LoginStatus.userNotFound){
            throw new HttpException("Error incorrect login or password",400);
        }
        if(token){
            res.cookie(REQ_COOKIE_SESSION,token,{signed:true});
        }        
    }

    @Get('logout')
    // @UseGuards(MyAuthGuard) 
    @UseGuards(MyAuthGuardAuth) 
    async logout(@Res({ passthrough: true }) res:Response){
        console.log("logout");
        //TODO: удалить session из базы данных User
        res.clearCookie(REQ_COOKIE_SESSION);
        return true;
    }
}

// @UseGuards(AuthGuard)

// @UseGuards(AuthGuard)
