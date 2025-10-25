import { Module } from '@nestjs/common';
import { FundamentalLineCourseService } from './fundamental-line-course.service';
import { FundamentalLineCourseController } from './fundamental-line-course.controller';
import { FundamentalLineCourse } from './entities/fundamental-line-course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FundamentalLineCourse]), UserModule],
  controllers: [FundamentalLineCourseController],
  providers: [FundamentalLineCourseService],
  exports: [FundamentalLineCourseService],
})
export class FundamentalLineCourseModule {}
