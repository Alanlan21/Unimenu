import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './menuItem.entity';
import { MenuItemService } from './menuItem.service';
import { MenuItemController } from './menuItem.controller';
import { Store } from 'src/store/store.entity';
import { ProductOrder } from 'src/product-order/product-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem, Store,ProductOrder])], // Verifique se o MenuItem está importado aqui
  controllers: [MenuItemController],
  providers: [MenuItemService], // Certifique-se de que o MenuItemService está aqui
<<<<<<< HEAD
  exports: [MenuItemService,TypeOrmModule],
=======
  exports: [MenuItemService],
>>>>>>> c0afe41a7bdc310fe963ab6d6f3e90ca605bfd17
})
export class MenuItemModule {}
