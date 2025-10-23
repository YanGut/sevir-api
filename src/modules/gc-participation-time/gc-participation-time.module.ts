import { Module } from '@nestjs/common';
import { GcParticipationTimeService } from './gc-participation-time.service';
import { GcParticipationTimeController } from './gc-participation-time.controller';
import { GcParticipationTime } from './entities/gc-participation-time.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GcParticipationTime])],
  controllers: [GcParticipationTimeController],
  providers: [GcParticipationTimeService],
  exports: [GcParticipationTimeService],
})
export class GcParticipationTimeModule {}
