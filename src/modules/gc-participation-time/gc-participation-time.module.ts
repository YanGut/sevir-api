import { Module } from '@nestjs/common';
import { GcParticipationTimeService } from './gc-participation-time.service';
import { GcParticipationTimeController } from './gc-participation-time.controller';

@Module({
  controllers: [GcParticipationTimeController],
  providers: [GcParticipationTimeService],
})
export class GcParticipationTimeModule {}
