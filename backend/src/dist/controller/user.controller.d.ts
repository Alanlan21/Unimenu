import { UserService } from '../service/user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
