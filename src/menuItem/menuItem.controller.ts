import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { MenuItemService } from './menuItem.service';
import { CreateMenuItemDto } from './dto/menuItem.dto';

@Controller('items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

<<<<<<< HEAD

=======
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return await this.menuItemService.create(createMenuItemDto);
  }

  @Get()
  async findAll() {
    return await this.menuItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.menuItemService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<CreateMenuItemDto>) {
    return await this.menuItemService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.menuItemService.remove(id);
  }
}
