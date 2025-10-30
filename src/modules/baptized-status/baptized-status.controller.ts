import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaptizedStatusService } from './baptized-status.service';
import { CreateBaptizedStatusDto } from './dto/create-baptized-status.dto';
import { UpdateBaptizedStatusDto } from './dto/update-baptized-status.dto';

@Controller('baptized-status')
export class BaptizedStatusController {
  constructor(private readonly baptizedStatusService: BaptizedStatusService) {}

  @Post()
  create(@Body() createBaptizedStatusDto: CreateBaptizedStatusDto) {
    return this.baptizedStatusService.create(createBaptizedStatusDto);
  }

  @Get()
  findAll() {
    return this.baptizedStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baptizedStatusService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaptizedStatusDto: UpdateBaptizedStatusDto) {
    return this.baptizedStatusService.update(id, updateBaptizedStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baptizedStatusService.remove(id);
  }
}
