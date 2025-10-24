import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';

@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @Get()
  findAll() {
    return this.volunteerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.volunteerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVolunteerDto: UpdateVolunteerDto) {
    return this.volunteerService.update(+id, updateVolunteerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.volunteerService.remove(+id);
  }
}
