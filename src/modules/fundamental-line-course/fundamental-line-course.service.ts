import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundamentalLineCourseDto } from './dto/create-fundamental-line-course.dto';
import { UpdateFundamentalLineCourseDto } from './dto/update-fundamental-line-course.dto';
import { FundamentalLineCourse } from './entities/fundamental-line-course.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class FundamentalLineCourseService {
  constructor(
    @InjectRepository(FundamentalLineCourse)
    private readonly fundamentalLineCourseRepository: Repository<FundamentalLineCourse>,
    private readonly userService: UserService,
  ) {}

  async create(
    createFundamentalLineCourseDto: CreateFundamentalLineCourseDto,
  ): Promise<FundamentalLineCourse> {
    const fundamentalLineCourse = this.fundamentalLineCourseRepository.create(
      createFundamentalLineCourseDto,
    );
    return await this.fundamentalLineCourseRepository.save(fundamentalLineCourse);
  }

  async findAll(): Promise<FundamentalLineCourse[]> {
    return await this.fundamentalLineCourseRepository.find();
  }

  async findOne(id: string): Promise<FundamentalLineCourse | null> {
    const findedFLC: FundamentalLineCourse | null =
      await this.fundamentalLineCourseRepository.findOneBy({ id });
    if (!findedFLC)
      throw new NotFoundException(`Fundamental Line Course with ID '${id}' not found`);
    return findedFLC;
  }

  async findOneByName(name: string): Promise<FundamentalLineCourse | null> {
    return await this.fundamentalLineCourseRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async update(
    id: string,
    updateFundamentalLineCourseDto: UpdateFundamentalLineCourseDto,
  ): Promise<FundamentalLineCourse> {
    const fundamentalLineCourse: FundamentalLineCourse | undefined =
      await this.fundamentalLineCourseRepository.preload({
        id: id,
        ...updateFundamentalLineCourseDto,
      });

    if (!fundamentalLineCourse)
      throw new NotFoundException(`Fundamental Line Course, with id: ${id} not found`);

    return await this.fundamentalLineCourseRepository.save(fundamentalLineCourse);
  }

  async remove(id: string) {
    return await this.fundamentalLineCourseRepository.delete(id);
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
