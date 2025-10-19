import { PartialType } from '@nestjs/mapped-types';
import { CreateFundamentalLineCourseDto } from './create-fundamental-line-course.dto';

export class UpdateFundamentalLineCourseDto extends PartialType(CreateFundamentalLineCourseDto) {}
