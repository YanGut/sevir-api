import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

import { UserRole } from '../user-role/entities/user-role.entity';
import { UserRoleService } from '../user-role/user-role.service';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userRoleService: UserRoleService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { roleId, ...restCreateUserDto } = createUserDto;

    const role: UserRole | null = await this.userRoleService.findOne(roleId);
    if (!role) throw new NotFoundException('User role not found');

    const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...restCreateUserDto,
      password: hashedPassword,
      role: role,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findAdmins(): Promise<User[]> {
    const adminRole: UserRole | null = await this.userRoleService.findOneByName('admin');
    if (!adminRole) return [];

    return this.userRepository.find({
      where: { role: { id: adminRole.id } },
      relations: ['role'],
    });
  }

  async seed(): Promise<void> {
    const adminEmail: string = this.configService.get<string>('admin.email', '');
    const adminPassword: string = this.configService.get<string>('admin.password', '');

    const adminExists: User | null = await this.findByEmail(adminEmail);
    if (adminExists) return;

    const adminRole: UserRole | null = await this.userRoleService.findOneByName('admin');
    if (!adminRole) return;

    const adminUser = new CreateUserDto();
    adminUser.email = adminEmail;
    adminUser.password = adminPassword;
    adminUser.name = 'Admin';

    const createdAdmin = await this.create(adminUser);
    createdAdmin.role = adminRole;
    await this.userRepository.save(createdAdmin);
  }
}
