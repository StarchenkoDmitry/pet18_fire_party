import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common"
import {Request} from "express"
import { UserRepository } from "src/user/user.repository"



export const REQ_RES_COOKIE_SESSION = "session";
export const REQ_KEY_SESSION = Symbol("session");
export const REQ_KEY_USER = Symbol("User");

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userService: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    try{
      const request:Request = context.switchToHttp().getRequest();
      const session = request.signedCookies[REQ_RES_COOKIE_SESSION];
      request[REQ_KEY_SESSION] = session;      
      // console.log("DoAuthUser session: ",session);

      if(!session) return false;

      const user = await this.userService.findOneBySession(session);
      // console.log("DoAuthUser user: ",user);

      if(!user) return false;

      request[REQ_KEY_USER] = user;
      return user.session === session;
    }catch(error){
      console.log("Error: ",error);
      return false;
    }
  }
}
