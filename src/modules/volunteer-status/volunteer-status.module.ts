import { Module } from '@nestjs/common';
import { VolunteerStatusService } from './volunteer-status.service';
import { VolunteerStatusController } from './volunteer-status.controller';
import { VolunteerStatus } from './entities/volunteer-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerStatus])],
  controllers: [VolunteerStatusController],
  providers: [VolunteerStatusService],
  exports: [VolunteerStatusService],
})
export class VolunteerStatusModule {}
