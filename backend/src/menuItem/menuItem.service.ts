import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menuItem.entity';
import { CreateMenuItemDto } from './dto/menuItem.dto';
import { Store } from '../store/store.entity';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,

    @InjectRepository(Store) // Injeção do repositório de Store
    private storeRepository: Repository<Store>,
  ) {}

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const store = await this.storeRepository.findOne({ where: { id: createMenuItemDto.storeId } });
    if (!store) {
      throw new Error('Store not found');
    }
  
    const menuItem = this.menuItemRepository.create({
      ...createMenuItemDto,
      store: store, // Associa a Store ao MenuItem
    });
    
    return await this.menuItemRepository.save(menuItem);
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemRepository.find();
  }

  async findOne(id: number): Promise<MenuItem> {
     const menuItem = this.menuItemRepository.findOne({ 
      where: { id } });
      relations: ['store', 'productOrders']
    if (!menuItem) {
      throw new Error("Item não foi encontrado")
    }
    return menuItem;
  }

  async update(id: number, updateData: Partial<MenuItem>): Promise<MenuItem> {
    await this.menuItemRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.menuItemRepository.delete(id);
  }
}
