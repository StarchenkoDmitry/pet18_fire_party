import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";
import { REQ_KEY_USER } from "./auth.guard";
import { User } from "@prisma/client";

export const UserDec : ()=>ParameterDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: User = request[REQ_KEY_USER];

        if(!user) throw new BadRequestException("436-98436098340968346-45457")

        // console.log("@UserDec decorator: ",user);
        return user;
    },
);