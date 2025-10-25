import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { VolunteerHasDepartmentController } from './volunteer-has-department.controller';
import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { DepartmentModule } from '../department/department.module';
import { VolunteerStatusModule } from '../volunteer-status/volunteer-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VolunteerHasDepartment]),
    VolunteerModule,
    DepartmentModule,
    VolunteerStatusModule,
  ],
  controllers: [VolunteerHasDepartmentController],
  providers: [VolunteerHasDepartmentService],
})
export class VolunteerHasDepartmentModule {}
