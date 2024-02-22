import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { LockerService } from "src/locker/locker.service";
import { UserEvent } from "src/common/user.interface";
import { EventsService } from "src/events/events.service";

@Injectable()
export class UserService {
    constructor(
        private readonly events: EventsService,
        private readonly locker: LockerService,
        private readonly userRepo: UserRepository
    ) {
        console.log("constructor UserService");
    }

    async setName(userId: string, name: string | null) {
        this.locker.mutexUsers.lock(userId);
        const res = await this.userRepo.setName(userId, name);

        if (res) {
            const event: UserEvent = {
                type: "USER_EVENT_CHANGE_NAME",
                data: { name },
            };
            this.events.eventUsers.emit(userId, event);
        }

        this.locker.mutexUsers.unlock(userId);
        return res;
    }

    async setSurname(userId: string, surname: string | null) {
        this.locker.mutexUsers.lock(userId);
        const res = await this.userRepo.setSurname(userId, surname);

        if (res) {
            const event: UserEvent = {
                type: "USER_EVENT_CHANGE_SURNAME",
                data: { surname },
            };
            this.events.eventUsers.emit(userId, event);
        }

        this.locker.mutexUsers.unlock(userId);
        return res;
    }
}
