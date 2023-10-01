import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import {Request} from "express"

import crypto from "crypto";

import { UserService } from "src/user/user.service";

export const REQ_COOKIE_SESSION = "session";


export const REQ_KET_TOKEN = "token";
export const REQ_KEY_SESSION = "session";//"session";


export const REQ_KEY_USER = Symbol("User");

@Injectable()
export class MyAuthGuard implements CanActivate {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

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


// export function DoAuthUser(context: ExecutionContext,userService: UserService):boolean{
//   try {
//     const request:Request = context.switchToHttp().getRequest();
//     // console.log("DoAuthUser cookies: ",request.signedCookies);
//     const session = request.signedCookies[REQ_KEY_SESSION];
//     console.log("DoAuthUser session: ",session);
//     if(session){
//       const user = this.userService.findOneByToken)

//       return true;      
//     }
//     else{
//       return false;
//     }
    
//   } catch (error) {
//     console.log("function DoAuthUser Error: ",error);    
//     return false;
//   }
// }






export function generateSession() {
  const sessionId = crypto.randomBytes(16).toString('base64');
  return sessionId;
}










// @Injectable()
// export class AuthGuard2 implements CanActivate {
//   canActivate(context: ExecutionContext): boolean{
//     try{
//       const request:Request = context.switchToHttp().getRequest();

//       const token = request.signedCookies[REQ_KET_TOKEN];
//       console.log(`${REQ_KET_TOKEN}: `,token);

//       return token !== undefined;
//     }catch(error){
//       console.log("Error: ",error);
//       return false;
//     }
//   }
// }


// @Injectable()
// export class NotAuthGuard2 implements CanActivate {
//   canActivate(context: ExecutionContext): boolean{
//     try{
//       const request:Request = context.switchToHttp().getRequest();
//       console.log("cookies: ",request.cookies);

//       const token = request.signedCookies[REQ_KET_TOKEN];
//       console.log(`${REQ_KET_TOKEN}: `,token);

//       return token === undefined ||  token === "";
//     }catch(error){
//       console.log("Error: ",error);
//       return false;
//     }
//   }
// }


