import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); 

    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    console.log("COK: ",request.cookies)
    // console.log("COK2: ",req.cookie['foo'])

    
    //  async login2(@Req() request: Request) {
    // console.log("login2=>");
    // console.log("l: ",request.cookies)

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
            console.log(`After... ${Date.now() - now}ms`)
        }),
      );
  }
}