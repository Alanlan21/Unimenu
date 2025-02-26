import { AuthService } from './auth.service';
import { UserService } from '../service/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../entity/user.entity';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
        };
    }>;
    getCurrentUser(req: any): Promise<User>;
}
