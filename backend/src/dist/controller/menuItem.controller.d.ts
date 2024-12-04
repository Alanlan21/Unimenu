import { MenuItemService } from '../service/menuItem.service';
import { CreateMenuItemDto } from '../dto/menuItem.dto';
export declare class MenuItemController {
    private readonly menuItemService;
    constructor(menuItemService: MenuItemService);
    create(createMenuItemDto: CreateMenuItemDto): Promise<import("../entity/menuItem.entity").MenuItem>;
    findAll(): Promise<import("../entity/menuItem.entity").MenuItem[]>;
    findOne(id: number): Promise<import("../entity/menuItem.entity").MenuItem>;
    update(id: number, updateData: Partial<CreateMenuItemDto>): Promise<import("../entity/menuItem.entity").MenuItem>;
    remove(id: number): Promise<void>;
}
