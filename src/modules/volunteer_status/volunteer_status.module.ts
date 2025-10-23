import { Module } from '@nestjs/common';
import { VolunteerStatusService } from './volunteer_status.service';
import { VolunteerStatusController } from './volunteer_status.controller';
import { VolunteerStatus } from './entities/volunteer_status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerStatus])],
  controllers: [VolunteerStatusController],
  providers: [VolunteerStatusService],
})
export class VolunteerStatusModule {}
