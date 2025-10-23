import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRoleService } from '../user-role/user-role.service';
import { FundamentalLineCourseService } from '../fundamental-line-course/fundamental-line-course.service';
import { GcParticipationTimeService } from '../gc-participation-time/gc-participation-time.service';
import { VolunteerStatusService } from '../volunteer-status/volunteer-status.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRoleService: UserRoleService,
    private readonly fundamentalLineCourseService: FundamentalLineCourseService,
    private readonly gcParticipationTimeService: GcParticipationTimeService,
    private readonly volunteerStatusService: VolunteerStatusService,
  ) {}

  async onModuleInit() {
    const runSeed = this.configService.get<boolean>('runSeed');
    if (runSeed) {
      await this.seed();
    }
  }

  async seed(): Promise<void> {
    await this.userRoleService.seed();
    await this.fundamentalLineCourseService.seed();
    await this.gcParticipationTimeService.seed();
    await this.volunteerStatusService.seed();
  }
}
