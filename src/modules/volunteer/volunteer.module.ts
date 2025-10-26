import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { Volunteer } from './entities/volunteer.entity';
import { PhoneNumberModule } from '../phone-number/phone-number.module';
import { AboutYouModule } from '../about-you/about-you.module';
import { DepartmentModule } from '../department/department.module';
import { FundamentalLineCourseModule } from '../fundamental-line-course/fundamental-line-course.module';
import { GcParticipationTimeModule } from '../gc-participation-time/gc-participation-time.module';
import { VolunteerStatusModule } from '../volunteer-status/volunteer-status.module';
import { VolunteerHasDepartmentModule } from '../volunteer-has-department/volunteer-has-department.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Volunteer]),
    PhoneNumberModule,
    AboutYouModule,
    DepartmentModule,
    FundamentalLineCourseModule,
    GcParticipationTimeModule,
    VolunteerStatusModule,
    VolunteerHasDepartmentModule,
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService],
})
export class VolunteerModule {}
