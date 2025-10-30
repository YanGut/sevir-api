import { Module } from '@nestjs/common';
import { AboutYouService } from './about-you.service';
import { AboutYouController } from './about-you.controller';
import { AboutYou } from './entities/about-you.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GcParticipationTimeModule } from '../gc-participation-time/gc-participation-time.module';
import { FundamentalLineCourseModule } from '../fundamental-line-course/fundamental-line-course.module';
import { BaptizedStatusModule } from '../baptized-status/baptized-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutYou]),
    GcParticipationTimeModule,
    FundamentalLineCourseModule,
    BaptizedStatusModule,
  ],
  controllers: [AboutYouController],
  providers: [AboutYouService],
  exports: [AboutYouService],
})
export class AboutYouModule {}
