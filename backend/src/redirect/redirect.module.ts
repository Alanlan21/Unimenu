import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';

@Module({
  controllers: [RedirectController],
})
export class RedirectModule {}
