import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';
import { VolunteerStatus } from '../volunteer-status/entities/volunteer-status.entity';
import { Volunteer } from '../volunteer/entities/volunteer.entity';
import { Department } from '../department/entities/department.entity';

@Injectable()
export class VolunteerHasDepartmentService {
  constructor(
    @InjectRepository(VolunteerHasDepartment)
    private readonly volunteerHasDepartmentRepository: Repository<VolunteerHasDepartment>,
  ) {}

  /**
   * Assigns a volunteer to a department with a specific status.
   * Can participate in an existing transaction.
   */
  async assign(
    volunteer: Volunteer,
    department: Department,
    status: VolunteerStatus,
    manager?: EntityManager,
  ): Promise<VolunteerHasDepartment> {
    const entityManager = manager || this.volunteerHasDepartmentRepository.manager;

    const existing = await entityManager.findOne(VolunteerHasDepartment, {
      where: {
        volunteer: { id: volunteer.id },
        department: { id: department.id },
      },
    });

    if (existing)
      throw new ConflictException('This volunteer is already assigned to this department.');

    const newAssignment = entityManager.create(VolunteerHasDepartment, {
      volunteer,
      department,
      volunteerStatus: status,
    });

    return entityManager.save(newAssignment);
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

  async remove(id: string): Promise<void> {
    const volunteerHasDepartment = await this.findOne(id);
    if (!volunteerHasDepartment)
      throw new NotFoundException(`VolunteerHasDepartment with ID "${id}" not found`);
    await this.volunteerHasDepartmentRepository.remove(volunteerHasDepartment);
  }
}
