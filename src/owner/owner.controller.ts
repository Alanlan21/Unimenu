import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/owner.dto';
import { Owner } from './owner.entity';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  findAll(): Promise<Owner[]> {
    return this.ownerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Owner> {
    return this.ownerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<Owner>): Promise<Owner> {
    return this.ownerService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ownerService.remove(+id);
  }
}
