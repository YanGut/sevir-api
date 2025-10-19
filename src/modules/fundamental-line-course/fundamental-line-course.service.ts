import { Injectable } from '@nestjs/common';
import { CreateFundamentalLineCourseDto } from './dto/create-fundamental-line-course.dto';
import { UpdateFundamentalLineCourseDto } from './dto/update-fundamental-line-course.dto';

@Injectable()
export class FundamentalLineCourseService {
  create(createFundamentalLineCourseDto: CreateFundamentalLineCourseDto) {
    return 'This action adds a new fundamentalLineCourse';
  }

  findAll() {
    return `This action returns all fundamentalLineCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fundamentalLineCourse`;
  }

  update(id: number, updateFundamentalLineCourseDto: UpdateFundamentalLineCourseDto) {
    return `This action updates a #${id} fundamentalLineCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} fundamentalLineCourse`;
  }
}
