import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './menuItem.entity';
import { MenuItemService } from './menuItem.service';
import { MenuItemController } from './menuItem.controller';
import { Store } from '../store/store.entity';
import { ProductOrder } from '../product-order/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Store,ProductOrder])], // Verifique se o MenuItem está importado aqui
  controllers: [MenuItemController],
  providers: [MenuItemService], // Certifique-se de que o MenuItemService está aqui
  exports: [MenuItemService,TypeOrmModule],
})
export class MenuItemModule {}
