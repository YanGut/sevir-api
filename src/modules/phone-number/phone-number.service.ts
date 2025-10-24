import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhoneNumberDto } from './dto/create-phone-number.dto';
import { UpdatePhoneNumberDto } from './dto/update-phone-number.dto';
import { PhoneNumber } from './entities/phone-number.entity';

@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumber)
    private readonly phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async create(createPhoneNumberDto: CreatePhoneNumberDto): Promise<PhoneNumber> {
    const phoneNumber = this.phoneNumberRepository.create(createPhoneNumberDto);
    return this.phoneNumberRepository.save(phoneNumber);
  }

  async findAll(): Promise<PhoneNumber[]> {
    return this.phoneNumberRepository.find();
  }

  async findOne(id: string): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumberRepository.findOne({ where: { id } });
    if (!phoneNumber) {
      throw new NotFoundException(`Phone number with ID "${id}" not found`);
    }
    return phoneNumber;
  }

  async update(id: string, updatePhoneNumberDto: UpdatePhoneNumberDto): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumberRepository.preload({
      id,
      ...updatePhoneNumberDto,
    });
    if (!phoneNumber) {
      throw new NotFoundException(`Phone number with ID "${id}" not found`);
    }
    return this.phoneNumberRepository.save(phoneNumber);
  }

  async remove(id: string): Promise<void> {
    const phoneNumber = await this.findOne(id);
    await this.phoneNumberRepository.remove(phoneNumber);
  }
}
