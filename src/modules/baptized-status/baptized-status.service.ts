import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBaptizedStatusDto } from './dto/create-baptized-status.dto';
import { UpdateBaptizedStatusDto } from './dto/update-baptized-status.dto';
import { BaptizedStatus } from './entities/baptized-status.entity';

@Injectable()
export class BaptizedStatusService {
  constructor(
    @InjectRepository(BaptizedStatus)
    private readonly baptizedStatusRepository: Repository<BaptizedStatus>,
  ) {}

  async create(createBaptizedStatusDto: CreateBaptizedStatusDto): Promise<BaptizedStatus> {
    const baptizedStatus: BaptizedStatus =
      this.baptizedStatusRepository.create(createBaptizedStatusDto);
    return await this.baptizedStatusRepository.save(baptizedStatus);
  }

  async findAll(): Promise<BaptizedStatus[]> {
    return await this.baptizedStatusRepository.find();
  }

  async findOne(id: string): Promise<BaptizedStatus | null> {
    return await this.baptizedStatusRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string): Promise<BaptizedStatus | null> {
    return await this.baptizedStatusRepository.findOne({ where: { name } });
  }

  async update(
    id: string,
    updateBaptizedStatusDto: UpdateBaptizedStatusDto,
  ): Promise<BaptizedStatus> {
    const baptizedStatus: BaptizedStatus | undefined = await this.baptizedStatusRepository.preload({
      id: id,
      ...updateBaptizedStatusDto,
    });

    if (!baptizedStatus) throw new NotFoundException(`BaptizedStatus with id: ${id} not found`);

    return await this.baptizedStatusRepository.save(baptizedStatus);
  }

  async remove(id: string) {
    const baptizedStatus = await this.baptizedStatusRepository.findOne({ where: { id } });
    if (!baptizedStatus) throw new NotFoundException(`BaptizedStatus with id: ${id} not found`);

    await this.baptizedStatusRepository.remove(baptizedStatus);
    return { message: `BaptizedStatus with id: ${id} removed successfully` };
  }

  async seed(): Promise<void> {
    const defaultStatuses = [
      'Sim, sou batizado',
      'Não, ainda não me batizei',
      'Estou inscrito para o próximo batismo',
    ];

    for (const name of defaultStatuses) {
      const existing = await this.findOneByName(name);
      if (existing) continue;

      const created = this.baptizedStatusRepository.create({ name });
      await this.baptizedStatusRepository.save(created);
    }
  }
}
