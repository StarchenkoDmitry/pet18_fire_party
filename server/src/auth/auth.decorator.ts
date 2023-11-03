import { ExecutionContext, createParamDecorator, UnauthorizedException } from "@nestjs/common"
import { REQ_KEY_USER } from "./auth.guard"
import { User } from "@prisma/client"

export const UserDec : ()=>ParameterDecorator = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const user: User = request[REQ_KEY_USER]

        if(!user) throw new UnauthorizedException()
        return user
    }
)
