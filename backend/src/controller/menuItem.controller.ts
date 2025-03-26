import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MenuItemService } from '../service/menuItem.service';
import { CreateMenuItemDto } from '../dto/menuItem.dto';

@Controller('items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  async create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return await this.menuItemService.create(createMenuItemDto);
  }

  @Get('stores/:storeId')
  async findByStore(@Param('storeId') storeId: number) {
    return await this.menuItemService.findByStore(storeId);
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
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateMenuItemDto>,
  ) {
    return await this.menuItemService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.menuItemService.remove(id);
  }
}
