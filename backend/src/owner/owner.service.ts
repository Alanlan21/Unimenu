import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity';
import { CreateOwnerDto } from './dto/owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwnerDto);
    return await this.ownerRepository.save(owner);
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find();
  }

  async findOne(id: number): Promise<Owner> {
    return await this.ownerRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<Owner>): Promise<Owner> {
    await this.ownerRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ownerRepository.delete(id);
  }
}
