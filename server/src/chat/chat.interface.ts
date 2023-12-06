import { Chat, User } from "@prisma/client";

export interface IChatIncludeUsers extends Chat {
    users:User[]
}
