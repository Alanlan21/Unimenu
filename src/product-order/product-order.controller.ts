import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductOrderService } from './product-order.service';
import { ProductOrder } from './product-order.entity';
import { CreateProductOrderDto } from './dto/product-order.dto';

@Controller('product-orders')
export class ProductOrderController {
  constructor(private readonly productOrderService: ProductOrderService) {}

  @Post()
  async create(@Body() createProductOrderDto: CreateProductOrderDto): Promise<ProductOrder> {
    return this.productOrderService.create(createProductOrderDto);
  }

  @Get()
  async findAll(): Promise<ProductOrder[]> {
    return this.productOrderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductOrder> {
    return this.productOrderService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<ProductOrder>): Promise<ProductOrder> {
    return this.productOrderService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productOrderService.remove(id);
  }
}
