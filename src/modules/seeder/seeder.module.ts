import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { UserRoleModule } from '../user-role/user-role.module';
import { ConfigModule } from '@nestjs/config';
import { FundamentalLineCourseModule } from '../fundamental-line-course/fundamental-line-course.module';
import { GcParticipationTimeModule } from '../gc-participation-time/gc-participation-time.module';
import { VolunteerStatusModule } from '../volunteer-status/volunteer-status.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserRoleModule,
    ConfigModule,
    FundamentalLineCourseModule,
    GcParticipationTimeModule,
    VolunteerStatusModule,
    UserModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
