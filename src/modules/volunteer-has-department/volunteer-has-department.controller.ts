import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { CreateVolunteerHasDepartmentDto } from './dto/create-volunteer-has-department.dto';
import { UpdateVolunteerHasDepartmentDto } from './dto/update-volunteer-has-department.dto';

@Controller('volunteer-has-department')
export class VolunteerHasDepartmentController {
  constructor(private readonly volunteerHasDepartmentService: VolunteerHasDepartmentService) {}

  @Post()
  create(@Body() createVolunteerHasDepartmentDto: CreateVolunteerHasDepartmentDto) {
    return this.volunteerHasDepartmentService.create(createVolunteerHasDepartmentDto);
  }

  @Get()
  findAll() {
    return this.volunteerHasDepartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerHasDepartmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolunteerHasDepartmentDto: UpdateVolunteerHasDepartmentDto) {
    return this.volunteerHasDepartmentService.update(+id, updateVolunteerHasDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerHasDepartmentService.remove(+id);
  }
}
