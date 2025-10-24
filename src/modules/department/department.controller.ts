import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import type { RequestWithUserInfo } from 'src/common/types/request-with-user-info.type';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createDepartmentDto: CreateDepartmentDto, @Req() req: RequestWithUserInfo) {
    return this.departmentService.create(createDepartmentDto, req);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: RequestWithUserInfo) {
    return this.departmentService.remove(id, req);
  }
}
