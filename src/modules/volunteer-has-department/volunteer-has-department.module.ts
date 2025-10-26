import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { VolunteerHasDepartmentController } from './volunteer-has-department.controller';
import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerHasDepartment])],
  controllers: [VolunteerHasDepartmentController],
  providers: [VolunteerHasDepartmentService],
  exports: [VolunteerHasDepartmentService],
})
export class VolunteerHasDepartmentModule {}
