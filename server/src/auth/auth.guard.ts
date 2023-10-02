import { CanActivate, ExecutionContext, Inject, Injectable, forwardRef } from "@nestjs/common"
import {Request} from "express"
import { UserService } from "src/user/user.service"



export const REQ_COOKIE_SESSION = "session";
export const REQ_KEY_SESSION = Symbol("session");
export const REQ_KEY_USER = Symbol("User");

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    try{
      const request:Request = context.switchToHttp().getRequest();
      // console.log("DoAuthUser cookies: ",request.signedCookies);
      const session = request.signedCookies[REQ_COOKIE_SESSION];
      request[REQ_KEY_SESSION] = session;      
      console.log("DoAuthUser session: ",session);

      if(session){
        const user = await this.userService.findOneBySession(session);
        console.log("DoAuthUser user: ",user);

        if(user){
          request[REQ_KEY_USER] = user;
        }
        
        return user !== null;
      }
      else{
        return false;
      }

    }catch(error){
      console.log("Error: ",error);
      return false;
    }
  }
}
