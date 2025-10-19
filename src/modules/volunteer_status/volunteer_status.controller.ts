import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolunteerStatusService } from './volunteer_status.service';
import { CreateVolunteerStatusDto } from './dto/create-volunteer_status.dto';
import { UpdateVolunteerStatusDto } from './dto/update-volunteer_status.dto';

@Controller('volunteer-status')
export class VolunteerStatusController {
  constructor(private readonly volunteerStatusService: VolunteerStatusService) {}

  @Post()
  create(@Body() createVolunteerStatusDto: CreateVolunteerStatusDto) {
    return this.volunteerStatusService.create(createVolunteerStatusDto);
  }

  @Get()
  findAll() {
    return this.volunteerStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volunteerStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolunteerStatusDto: UpdateVolunteerStatusDto) {
    return this.volunteerStatusService.update(+id, updateVolunteerStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerStatusService.remove(+id);
  }
}
