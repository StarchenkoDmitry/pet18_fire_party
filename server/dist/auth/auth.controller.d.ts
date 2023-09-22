import { LoginDto, SignUpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UserService);
    register(dto: SignUpDto): Promise<void>;
    login(dto: LoginDto): Promise<{
        ok: string;
    }>;
    logout(): Promise<boolean>;
}
