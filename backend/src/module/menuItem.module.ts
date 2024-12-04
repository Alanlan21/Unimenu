import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from '../entity/menuItem.entity';
import { MenuItemService } from '../service/menuItem.service';
import { MenuItemController } from '../controller/menuItem.controller';
import { Store } from '../entity/store.entity';
import { ProductOrder } from '../entity/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Store, ProductOrder])], // Verifique se o MenuItem está importado aqui
  controllers: [MenuItemController],
  providers: [MenuItemService], // Certifique-se de que o MenuItemService está aqui
  exports: [MenuItemService, TypeOrmModule],
})
export class MenuItemModule {}
