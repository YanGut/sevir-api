import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  create(createUserRoleDto: CreateUserRoleDto) {
    const userRole = this.userRoleRepository.create(createUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  findAll() {
    return this.userRoleRepository.find();
  }

  findOne(id: string) {
    return this.userRoleRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return await this.userRoleRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleRepository.update(id, updateUserRoleDto);
  }

  remove(id: string) {
    return this.userRoleRepository.delete(id);
  }

  async seed(): Promise<void> {
    const defaultRoles = ['lider', 'admin'];

    for (const roleName of defaultRoles) {
      const existingRole = await this.findOneByName(roleName);
      if (!existingRole) {
        await this.create({ name: roleName });
      }
    }
  }
}
