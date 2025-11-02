import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGcParticipationTimeDto } from './dto/create-gc-participation-time.dto';
import { UpdateGcParticipationTimeDto } from './dto/update-gc-participation-time.dto';
import { GcParticipationTime } from './entities/gc-participation-time.entity';

@Injectable()
export class GcParticipationTimeService {
  constructor(
    @InjectRepository(GcParticipationTime)
    private readonly gcParticipationTimeRepository: Repository<GcParticipationTime>,
  ) {}

  create(createGcParticipationTimeDto: CreateGcParticipationTimeDto): Promise<GcParticipationTime> {
    const gcParticipationTime = this.gcParticipationTimeRepository.create(
      createGcParticipationTimeDto,
    );
    return this.gcParticipationTimeRepository.save(gcParticipationTime);
  }

  findAll(): Promise<GcParticipationTime[]> {
    return this.gcParticipationTimeRepository.find();
  }

  findOne(id: string): Promise<GcParticipationTime | null> {
    return this.gcParticipationTimeRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<GcParticipationTime | null> {
    return await this.gcParticipationTimeRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: string, updateGcParticipationTimeDto: UpdateGcParticipationTimeDto) {
    return this.gcParticipationTimeRepository.update(id, updateGcParticipationTimeDto);
  }

  remove(id: string) {
    return this.gcParticipationTimeRepository.delete(id);
  }

  async seed(): Promise<void> {
    const gcParticipationTimeToSeed = [
      'Menos de 3 meses',
      'Entre 3 meses e 6 meses',
      'Mais de 7 meses',
    ];

    for (const name of gcParticipationTimeToSeed) {
      const existing = await this.findOneByName(name);
      if (!existing) {
        await this.create({ name });
      }
    }
  }
}
