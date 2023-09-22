import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    create(createUserDto: CreateUserDto): Promise<Boolean>;
    findOne(login: string): Promise<User>;
}
