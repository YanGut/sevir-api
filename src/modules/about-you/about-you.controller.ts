import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AboutYouService } from './about-you.service';
import { CreateAboutYouDto } from './dto/create-about-you.dto';
import { UpdateAboutYouDto } from './dto/update-about-you.dto';

@Controller('about-you')
export class AboutYouController {
  constructor(private readonly aboutYouService: AboutYouService) {}

  @Post()
  create(@Body() createAboutYouDto: CreateAboutYouDto) {
    return this.aboutYouService.create(createAboutYouDto);
  }

  @Get()
  findAll() {
    return this.aboutYouService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutYouService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutYouDto: UpdateAboutYouDto) {
    return this.aboutYouService.update(+id, updateAboutYouDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutYouService.remove(+id);
  }
}
