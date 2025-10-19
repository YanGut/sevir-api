import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundamentalLineCourseService } from './fundamental-line-course.service';
import { CreateFundamentalLineCourseDto } from './dto/create-fundamental-line-course.dto';
import { UpdateFundamentalLineCourseDto } from './dto/update-fundamental-line-course.dto';

@Controller('fundamental-line-course')
export class FundamentalLineCourseController {
  constructor(private readonly fundamentalLineCourseService: FundamentalLineCourseService) {}

  @Post()
  create(@Body() createFundamentalLineCourseDto: CreateFundamentalLineCourseDto) {
    return this.fundamentalLineCourseService.create(createFundamentalLineCourseDto);
  }

  @Get()
  findAll() {
    return this.fundamentalLineCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundamentalLineCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFundamentalLineCourseDto: UpdateFundamentalLineCourseDto) {
    return this.fundamentalLineCourseService.update(+id, updateFundamentalLineCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fundamentalLineCourseService.remove(+id);
  }
}
