import { Repository } from 'typeorm';
import { MenuItem } from './menuItem.entity';
import { CreateMenuItemDto } from './dto/menuItem.dto';
import { Store } from '../store/store.entity';
export declare class MenuItemService {
    private menuItemRepository;
    private storeRepository;
    constructor(menuItemRepository: Repository<MenuItem>, storeRepository: Repository<Store>);
    create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem>;
    findAll(): Promise<MenuItem[]>;
    findOne(id: number): Promise<MenuItem>;
    update(id: number, updateData: Partial<MenuItem>): Promise<MenuItem>;
    remove(id: number): Promise<void>;
}
