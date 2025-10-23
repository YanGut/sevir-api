import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundamentalLineCourseDto } from './dto/create-fundamental-line-course.dto';
import { UpdateFundamentalLineCourseDto } from './dto/update-fundamental-line-course.dto';
import { FundamentalLineCourse } from './entities/fundamental-line-course.entity';

@Injectable()
export class FundamentalLineCourseService {
  constructor(
    @InjectRepository(FundamentalLineCourse)
    private readonly fundamentalLineCourseRepository: Repository<FundamentalLineCourse>,
  ) {}

  create(
    createFundamentalLineCourseDto: CreateFundamentalLineCourseDto,
  ): Promise<FundamentalLineCourse> {
    const fundamentalLineCourse = this.fundamentalLineCourseRepository.create(
      createFundamentalLineCourseDto,
    );
    return this.fundamentalLineCourseRepository.save(fundamentalLineCourse);
  }

  findAll(): Promise<FundamentalLineCourse[]> {
    return this.fundamentalLineCourseRepository.find();
  }

  findOne(id: string): Promise<FundamentalLineCourse | null> {
    return this.fundamentalLineCourseRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<FundamentalLineCourse | null> {
    return await this.fundamentalLineCourseRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: string, updateFundamentalLineCourseDto: UpdateFundamentalLineCourseDto) {
    return this.fundamentalLineCourseRepository.update(id, updateFundamentalLineCourseDto);
  }

  remove(id: string) {
    return this.fundamentalLineCourseRepository.delete(id);
  }

  async seed(): Promise<void> {
    const fundamentalLineCourseToSeed = [
      'Estou finalizando um neste momento',
      'Não, mas pretendo me inscrever na próxima',
      'Não tenho conhecimento sobre os cursos',
    ];

    for (const name of fundamentalLineCourseToSeed) {
      const existing = await this.findOneByName(name);
      if (!existing) {
        await this.create({ name });
      }
    }
  }
}
