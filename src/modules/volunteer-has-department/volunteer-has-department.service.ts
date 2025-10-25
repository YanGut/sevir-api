import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVolunteerHasDepartmentDto } from './dto/create-volunteer-has-department.dto';
import { UpdateVolunteerHasDepartmentDto } from './dto/update-volunteer-has-department.dto';
import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';
import { VolunteerService } from '../volunteer/volunteer.service';
import { DepartmentService } from '../department/department.service';
import { VolunteerStatusService } from '../volunteer-status/volunteer-status.service';

@Injectable()
export class VolunteerHasDepartmentService {
  constructor(
    @InjectRepository(VolunteerHasDepartment)
    private readonly volunteerHasDepartmentRepository: Repository<VolunteerHasDepartment>,
    private readonly volunteerService: VolunteerService,
    private readonly departmentService: DepartmentService,
    private readonly volunteerStatusService: VolunteerStatusService,
  ) {}

  async create(
    createVolunteerHasDepartmentDto: CreateVolunteerHasDepartmentDto,
  ): Promise<VolunteerHasDepartment> {
    const { volunteerId, departmentId, volunteerStatusId } = createVolunteerHasDepartmentDto;

    const volunteer = await this.volunteerService.findOne(volunteerId);
    if (!volunteer) throw new NotFoundException(`Volunteer with ID "${volunteerId}" not found`);

    const department = await this.departmentService.findOne(departmentId);
    if (!department) throw new NotFoundException(`Department with ID "${departmentId}" not found`);

    const volunteerStatus = await this.volunteerStatusService.findOne(volunteerStatusId);
    if (!volunteerStatus)
      throw new NotFoundException(`VolunteerStatus with ID "${volunteerStatusId}" not found`);

    const volunteerHasDepartment = this.volunteerHasDepartmentRepository.create({
      volunteer,
      department,
      volunteerStatus,
    });

    return this.volunteerHasDepartmentRepository.save(volunteerHasDepartment);
  }

  async findAll(): Promise<VolunteerHasDepartment[]> {
    return this.volunteerHasDepartmentRepository.find({
      relations: ['volunteer', 'department', 'volunteerStatus'],
    });
  }

  async findOne(id: string): Promise<VolunteerHasDepartment> {
    const volunteerHasDepartment = await this.volunteerHasDepartmentRepository.findOne({
      where: { id },
      relations: ['volunteer', 'department', 'volunteerStatus'],
    });
    if (!volunteerHasDepartment) {
      throw new NotFoundException(`VolunteerHasDepartment with ID "${id}" not found`);
    }
    return volunteerHasDepartment;
  }

  async update(
    id: string,
    updateVolunteerHasDepartmentDto: UpdateVolunteerHasDepartmentDto,
  ): Promise<VolunteerHasDepartment> {
    const { volunteerId, departmentId, volunteerStatusId } = updateVolunteerHasDepartmentDto;

    const updatePayload: VolunteerHasDepartment = new VolunteerHasDepartment();
    updatePayload.id = id;

    if (!volunteerId) throw new NotFoundException(`VolunteerId is required for update`);
    const volunteer = await this.volunteerService.findOne(volunteerId);
    if (!volunteer) throw new NotFoundException(`Volunteer with ID "${volunteerId}" not found`);
    updatePayload.volunteer = volunteer;

    if (!departmentId) throw new NotFoundException(`DepartmentId is required for update`);
    const department = await this.departmentService.findOne(departmentId);
    if (!department) throw new NotFoundException(`Department with ID "${departmentId}" not found`);
    updatePayload.department = department;

    if (!volunteerStatusId) throw new NotFoundException(`VolunteerStatusId is required for update`);
    const volunteerStatus = await this.volunteerStatusService.findOne(volunteerStatusId);
    if (!volunteerStatus)
      throw new NotFoundException(`VolunteerStatus with ID "${volunteerStatusId}" not found`);
    updatePayload.volunteerStatus = volunteerStatus;

    const volunteerHasDepartment =
      await this.volunteerHasDepartmentRepository.preload(updatePayload);

    if (!volunteerHasDepartment) {
      throw new NotFoundException(`VolunteerHasDepartment with ID "${id}" not found`);
    }
    return this.volunteerHasDepartmentRepository.save(volunteerHasDepartment);
  }

  async remove(id: string): Promise<void> {
    const volunteerHasDepartment = await this.findOne(id);
    if (!volunteerHasDepartment)
      throw new NotFoundException(`VolunteerHasDepartment with ID "${id}" not found`);
    await this.volunteerHasDepartmentRepository.remove(volunteerHasDepartment);
  }
}
