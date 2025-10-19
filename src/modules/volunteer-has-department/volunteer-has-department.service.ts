import { Injectable } from '@nestjs/common';
import { CreateVolunteerHasDepartmentDto } from './dto/create-volunteer-has-department.dto';
import { UpdateVolunteerHasDepartmentDto } from './dto/update-volunteer-has-department.dto';

@Injectable()
export class VolunteerHasDepartmentService {
  create(createVolunteerHasDepartmentDto: CreateVolunteerHasDepartmentDto) {
    return 'This action adds a new volunteerHasDepartment';
  }

  findAll() {
    return `This action returns all volunteerHasDepartment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volunteerHasDepartment`;
  }

  update(id: number, updateVolunteerHasDepartmentDto: UpdateVolunteerHasDepartmentDto) {
    return `This action updates a #${id} volunteerHasDepartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} volunteerHasDepartment`;
  }
}
