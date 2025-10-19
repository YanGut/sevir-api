import { Module } from '@nestjs/common';
import { VolunteerStatusService } from './volunteer_status.service';
import { VolunteerStatusController } from './volunteer_status.controller';

@Module({
  controllers: [VolunteerStatusController],
  providers: [VolunteerStatusService],
})
export class VolunteerStatusModule {}
