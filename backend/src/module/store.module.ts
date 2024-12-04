import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from '../entity/store.entity';
import { StoreService } from '../service/store.service';
import { StoreController } from '../controller/store.controller';
import { Owner } from '../entity/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Owner])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
