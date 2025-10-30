import { Module } from '@nestjs/common';
import { BaptizedStatusService } from './baptized-status.service';
import { BaptizedStatusController } from './baptized-status.controller';

@Module({
  controllers: [BaptizedStatusController],
  providers: [BaptizedStatusService],
})
export class BaptizedStatusModule {}
