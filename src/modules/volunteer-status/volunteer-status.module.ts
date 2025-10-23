import { Module } from '@nestjs/common';
import { VolunteerStatusService } from './volunteer-status.service';
import { VolunteerStatusController } from './volunteer-status.controller';

@Module({
  controllers: [VolunteerStatusController],
  providers: [VolunteerStatusService],
})
export class VolunteerStatusModule {}
