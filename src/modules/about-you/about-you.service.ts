import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutYouDto } from './dto/create-about-you.dto';
import { UpdateAboutYouDto } from './dto/update-about-you.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutYou } from './entities/about-you.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutYouService {
  constructor(
    @InjectRepository(AboutYou)
    private readonly aboutYouRepository: Repository<AboutYou>,
  ) {}

  async create(createAboutYouDto: CreateAboutYouDto): Promise<AboutYou> {
    const aboutYou = this.aboutYouRepository.create(createAboutYouDto);
    return this.aboutYouRepository.save(aboutYou);
  }

  async findAll(): Promise<AboutYou[]> {
    return this.aboutYouRepository.find();
  }

  async findOne(id: string): Promise<AboutYou> {
    const aboutYou = await this.aboutYouRepository.findOne({ where: { id } });
    if (!aboutYou) {
      throw new NotFoundException(`AboutYou with ID "${id}" not found`);
    }
    return aboutYou;
  }

  async update(id: string, updateAboutYouDto: UpdateAboutYouDto): Promise<AboutYou> {
    const aboutYou = await this.aboutYouRepository.preload({
      id,
      ...updateAboutYouDto,
    });
    if (!aboutYou) {
      throw new NotFoundException(`AboutYou with ID "${id}" not found`);
    }
    return this.aboutYouRepository.save(aboutYou);
  }

  async remove(id: string): Promise<void> {
    const aboutYou = await this.findOne(id);
    await this.aboutYouRepository.remove(aboutYou);
  }
}
