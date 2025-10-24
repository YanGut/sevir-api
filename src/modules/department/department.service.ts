import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { RequestWithUserInfo } from 'src/common/types/request-with-user-info.type';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly userService: UserService,
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto,
    req: RequestWithUserInfo,
  ): Promise<Department> {
    if (!req.userId) throw new Error('Unauthorized: User ID not found in request');
    const user: User | null = await this.userService.findById(req.userId);
    if (!user) throw new Error('Unauthorized: User not found');

    if (user.role.name.toLowerCase() !== 'admin')
      throw new Error('Unauthorized: Only admins can create departments');

    const newDepartment: Department = this.departmentRepository.create(createDepartmentDto);
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

  async remove(id: string, req: RequestWithUserInfo): Promise<void> {
    if (!req.userId) throw new Error('Unauthorized: User ID not found in request');
    const user: User | null = await this.userService.findById(req.userId);
    if (!user) throw new Error('Unauthorized: User not found');

    if (user.role.name.toLowerCase() !== 'admin')
      throw new Error('Unauthorized: Only admins can delete departments');

    await this.departmentRepository.delete(id);
  }

  async seed(): Promise<void> {
    const departmentsData: CreateDepartmentDto[] = [
      {
        name: 'Ninho (bebês de 3 meses a 1 ano e 11 meses)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Arca (crianças de 2 e 3 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Reino (crianças de 4 e 5 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Safari (crianças de 6 a 7 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Connect (crianças de 8 a 11 anos)',
        active: true,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Check in',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Produção',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Estação brincar',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Estação oficinas',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Estação culto',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Eventos',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Boas vindas',
        active: false,
        inRequestQEOne: false,
        inRequestQETwo: false,
      },
      {
        name: 'Farol (departamento para inclusão de crianças atípicas)',
        active: true,
        inRequestQEOne: true,
        inRequestQETwo: true,
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
