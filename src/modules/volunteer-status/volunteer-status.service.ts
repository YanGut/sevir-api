import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVolunteerStatusDto } from './dto/create-volunteer-status.dto';
import { UpdateVolunteerStatusDto } from './dto/update-volunteer-status.dto';
import { VolunteerStatus } from './entities/volunteer-status.entity';

@Injectable()
export class VolunteerStatusService {
  constructor(
    @InjectRepository(VolunteerStatus)
    private readonly volunteerStatusRepository: Repository<VolunteerStatus>,
  ) {}

  create(createVolunteerStatusDto: CreateVolunteerStatusDto): Promise<VolunteerStatus> {
    const volunteerStatus = this.volunteerStatusRepository.create(createVolunteerStatusDto);
    return this.volunteerStatusRepository.save(volunteerStatus);
  }

  findAll(): Promise<VolunteerStatus[]> {
    return this.volunteerStatusRepository.find();
  }

  findOne(id: string): Promise<VolunteerStatus | null> {
    return this.volunteerStatusRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<VolunteerStatus | null> {
    return await this.volunteerStatusRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(id: string, updateVolunteerStatusDto: UpdateVolunteerStatusDto) {
    return this.volunteerStatusRepository.update(id, updateVolunteerStatusDto);
  }

  remove(id: string) {
    return this.volunteerStatusRepository.delete(id);
  }

  async seed(): Promise<void> {
    const volunteerStatusToSeed = [
      'Lider de GC contactado',
      'Lider de GC não respondeu contato',
      'Lider de GC aprovou voluntário',
      'Lider de GC reprovou voluntário',
      'Voluntário contactado',
      'Voluntário não respondeu contato',
      'Voluntário desistiu de servir',
      'Entrevista marcada',
      'Aprovado na entrevista',
      'Reprovado na entrevista',
      'Iniciou o servir',
      'Entrou oficialmente no time',
      'Impedido',
    ];

    for (const name of volunteerStatusToSeed) {
      const existing = await this.findOneByName(name);
      if (!existing) {
        await this.create({ name });
      }
    }
  }
}
