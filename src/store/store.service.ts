import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/store.dto';
import { Owner } from 'src/owner/owner.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const owner = await this.ownerRepository.findOne({ where: { id: createStoreDto.ownerId } });
    if (!owner) {
      throw new NotFoundException('Proprietário não encontrado');
    }

    const store = this.storeRepository.create({
      ...createStoreDto,
      owner, // Associa a Store ao Owner
    });

    return await this.storeRepository.save(store);
  }

  async findAll(): Promise<Store[]> {
    return await this.storeRepository.find();
  }

 async findOne(id: number): Promise<Store> { 
  const store = await this.storeRepository.findOne({ 
    where: { id } });
    relations: ['menuItems', 'owner'] 
  if (!store) { throw new NotFoundException('Restaurante não encontrado'); } return store; }

  async update(id: number, updateData: Partial<Store>): Promise<Store> {
    await this.storeRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
