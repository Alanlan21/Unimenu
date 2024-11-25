import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Owner } from '../owner/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Owner])],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
