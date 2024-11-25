import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { CreateLoginDto } from './dto/login.dto';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: CreateLoginDto): Promise<any>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
}
