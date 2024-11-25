import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10); // Gerar um salt
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt); // Hash da senha
  
    // Agora, armazene o hashedPassword no banco de dados
    const user = await this.userRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
  
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.password !== password) {
      throw new Error('Credenciais inválidas');
    }
    return user;
  }
}
