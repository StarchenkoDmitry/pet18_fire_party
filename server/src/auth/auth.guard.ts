import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import {Request} from "express"

export const REQ_KET_TOKEN = "token";


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean{
    try{
      const request:Request = context.switchToHttp().getRequest();

      const token = request.signedCookies[REQ_KET_TOKEN];
      console.log(`${REQ_KET_TOKEN}: `,token);

      return token !== undefined;
    }catch(error){
      console.log("Error: ",error);
      return false;
    }
  }
}


@Injectable()
export class NotAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean{
    try{
      const request:Request = context.switchToHttp().getRequest();
      console.log("cookies: ",request.cookies);

      const token = request.signedCookies[REQ_KET_TOKEN];
      console.log(`${REQ_KET_TOKEN}: `,token);

      return token === undefined ||  token === "";
    }catch(error){
      console.log("Error: ",error);
      return false;
    }
  }
}
