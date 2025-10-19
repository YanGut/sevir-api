import { Injectable } from '@nestjs/common';
import { CreateGcParticipationTimeDto } from './dto/create-gc-participation-time.dto';
import { UpdateGcParticipationTimeDto } from './dto/update-gc-participation-time.dto';

@Injectable()
export class GcParticipationTimeService {
  create(createGcParticipationTimeDto: CreateGcParticipationTimeDto) {
    return 'This action adds a new gcParticipationTime';
  }

  findAll() {
    return `This action returns all gcParticipationTime`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gcParticipationTime`;
  }

  update(id: number, updateGcParticipationTimeDto: UpdateGcParticipationTimeDto) {
    return `This action updates a #${id} gcParticipationTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} gcParticipationTime`;
  }
}
