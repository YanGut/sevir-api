import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
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
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async seed(): Promise<void> {
    const adminEmail = this.configService.get<string>('admin.email', '');
    const adminPassword = this.configService.get<string>('admin.password', '');

    const adminExists = await this.findByEmail(adminEmail);

    if (adminExists) {
      return;
    }

    const adminRole = await this.userRoleService.findOneByName('admin');

    if (!adminRole) {
      return;
    }

    const adminUser = new CreateUserDto();
    adminUser.email = adminEmail;
    adminUser.password = adminPassword;
    adminUser.name = 'Admin';

    const createdAdmin = await this.create(adminUser);
    createdAdmin.role = adminRole;
    await this.userRepository.save(createdAdmin);
  }
}
