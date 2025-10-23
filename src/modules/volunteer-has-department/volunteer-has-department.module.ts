import { Module } from '@nestjs/common';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { VolunteerHasDepartmentController } from './volunteer-has-department.controller';
import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerHasDepartment])],
  controllers: [VolunteerHasDepartmentController],
  providers: [VolunteerHasDepartmentService],
})
export class VolunteerHasDepartmentModule {}
