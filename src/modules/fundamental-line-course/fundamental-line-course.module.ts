import { Module } from '@nestjs/common';
import { FundamentalLineCourseService } from './fundamental-line-course.service';
import { FundamentalLineCourseController } from './fundamental-line-course.controller';
import { FundamentalLineCourse } from './entities/fundamental-line-course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FundamentalLineCourse])],
  controllers: [FundamentalLineCourseController],
  providers: [FundamentalLineCourseService],
})
export class FundamentalLineCourseModule {}
