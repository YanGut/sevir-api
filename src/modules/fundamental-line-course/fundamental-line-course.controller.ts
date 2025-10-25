import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FundamentalLineCourseService } from './fundamental-line-course.service';
import { CreateFundamentalLineCourseDto } from './dto/create-fundamental-line-course.dto';
import { UpdateFundamentalLineCourseDto } from './dto/update-fundamental-line-course.dto';

import { AdminGuard } from 'src/common/guards/admin.guard';

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
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.fundamentalLineCourseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFundamentalLineCourseDto: UpdateFundamentalLineCourseDto,
  ) {
    return this.fundamentalLineCourseService.update(id, updateFundamentalLineCourseDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.fundamentalLineCourseService.remove(id);
  }
}
