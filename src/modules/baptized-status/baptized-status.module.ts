import { Module } from '@nestjs/common';
import { BaptizedStatusService } from './baptized-status.service';
import { BaptizedStatusController } from './baptized-status.controller';
import { BaptizedStatus } from './entities/baptized-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BaptizedStatus])],
  controllers: [BaptizedStatusController],
  providers: [BaptizedStatusService],
  exports: [BaptizedStatusService],
})
export class BaptizedStatusModule {}
