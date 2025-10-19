import { Module } from '@nestjs/common';
import { FundamentalLineCourseService } from './fundamental-line-course.service';
import { FundamentalLineCourseController } from './fundamental-line-course.controller';

@Module({
  controllers: [FundamentalLineCourseController],
  providers: [FundamentalLineCourseService],
})
export class FundamentalLineCourseModule {}
