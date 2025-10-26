import { Controller, Get, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';

@Controller('volunteer-has-department')
export class VolunteerHasDepartmentController {
  constructor(private readonly volunteerHasDepartmentService: VolunteerHasDepartmentService) {}

  @Get()
  findAll() {
    return this.volunteerHasDepartmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.volunteerHasDepartmentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.volunteerHasDepartmentService.remove(id);
  }
}
