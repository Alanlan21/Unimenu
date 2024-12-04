import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../entity/owner.entity';
import { OwnerService } from '../service/owner.service';
import { OwnerController } from '../controller/owner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [OwnerService],
  controllers: [OwnerController],
})
export class OwnerModule {}
