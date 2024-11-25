import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/menuItem.dto';
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    create(createMenuItemDto: CreateMenuItemDto): Promise<import("./menuItem.entity").MenuItem>;
    findAll(): Promise<import("./menuItem.entity").MenuItem[]>;
    findOne(id: number): Promise<import("./menuItem.entity").MenuItem>;
    update(id: number, updateData: Partial<CreateMenuItemDto>): Promise<import("./menuItem.entity").MenuItem>;
    remove(id: number): Promise<void>;
}
