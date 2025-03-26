import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOneByEmail(email: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<{
        password: any;
        name: string;
        email: string;
        confirmEmail: string;
        confirmPassword: string;
        cpf: string;
        phone: string;
        birthDate: string;
        gender: string;
    } & User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateData: Partial<User>): Promise<User>;
    remove(id: number): Promise<void>;
    validateUser(email: string, password: string): Promise<User>;
}
