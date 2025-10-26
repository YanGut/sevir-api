import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly userService: UserService,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const leader: User | null = await this.userService.findById(createDepartmentDto.leaderId);

    if (!leader) throw new NotFoundException('Leader user not found');

    const newDepartment: Department = this.departmentRepository.create({
      ...createDepartmentDto,
      user: leader,
    });
    return await this.departmentRepository.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return await this.departmentRepository.find();
  }

  async findOne(id: string): Promise<Department | null> {
    return await this.departmentRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Department | null> {
    return await this.departmentRepository.findOne({
      where: { name },
    });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return await this.departmentRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.departmentRepository.delete(id);
  }

  async seed(): Promise<void> {
    const adminUsers: User[] = await this.userService.findAdmins();
    if (adminUsers.length === 0)
      throw new NotFoundException(
        'No admin users found. Please create an admin user before seeding departments.',
      );

    const departmentsData: CreateDepartmentDto[] = [
      {
        name: 'Ninho (bebês de 3 meses a 1 ano e 11 meses)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Arca (crianças de 2 e 3 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Reino (crianças de 4 e 5 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Safari (crianças de 6 a 7 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Connect (crianças de 8 a 11 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Check in',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Produção',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Estação brincar',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Estação oficinas',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Estação culto',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Eventos',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Boas vindas',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
        leaderId: adminUsers[0].id,
      },
      {
        name: 'Farol (departamento para inclusão de crianças atípicas)',
        active: true,
        inRequestQEOne: true,
        inRequestQETwo: true,
        leaderId: adminUsers[0].id,
      },
    ];

    for (const department of departmentsData) {
      const departmentExists: Department | null = await this.findOneByName(department.name);
      if (departmentExists) continue;
      const newDepartment: Department = this.departmentRepository.create(department);
      await this.departmentRepository.save(newDepartment);
    }
  }
}
