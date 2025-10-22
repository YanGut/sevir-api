import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GcParticipationTimeService } from './gc-participation-time.service';
import { CreateGcParticipationTimeDto } from './dto/create-gc-participation-time.dto';
import { UpdateGcParticipationTimeDto } from './dto/update-gc-participation-time.dto';

@Controller('gc-participation-time')
export class GcParticipationTimeController {
  constructor(private readonly gcParticipationTimeService: GcParticipationTimeService) {}

  @Post()
  create(@Body() createGcParticipationTimeDto: CreateGcParticipationTimeDto) {
    return this.gcParticipationTimeService.create(createGcParticipationTimeDto);
  }

  @Get()
  findAll() {
    return this.gcParticipationTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gcParticipationTimeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGcParticipationTimeDto: UpdateGcParticipationTimeDto,
  ) {
    return this.gcParticipationTimeService.update(+id, updateGcParticipationTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gcParticipationTimeService.remove(+id);
  }
}
