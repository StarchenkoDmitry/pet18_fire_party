import { Injectable } from "@nestjs/common";
import { ChatEvent } from "src/common/chat.interface";
import { UserEvent } from "src/common/user.interface";
import { CustomEmiter } from "src/utils/CustomEmiter";

export type EventChat = (event: ChatEvent) => void;
export type EventUser = (event: UserEvent) => void;

@Injectable()
export class EventsService {
    constructor() {
        console.log("constructor EventsService");
    }

    public readonly eventChats = new CustomEmiter<EventChat>();
    public readonly eventUsers = new CustomEmiter<EventUser>();
}
