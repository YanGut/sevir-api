import { Module } from '@nestjs/common';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { VolunteerHasDepartmentController } from './volunteer-has-department.controller';

@Module({
  controllers: [VolunteerHasDepartmentController],
  providers: [VolunteerHasDepartmentService],
})
export class VolunteerHasDepartmentModule {}
