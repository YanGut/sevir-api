import { Injectable } from '@nestjs/common';
import { CreateVolunteerStatusDto } from './dto/create-volunteer-status.dto';
import { UpdateVolunteerStatusDto } from './dto/update-volunteer-status.dto';

@Injectable()
export class VolunteerStatusService {
  create(createVolunteerStatusDto: CreateVolunteerStatusDto) {
    return 'This action adds a new volunteerStatus';
  }

  findAll() {
    return `This action returns all volunteerStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volunteerStatus`;
  }

  update(id: number, updateVolunteerStatusDto: UpdateVolunteerStatusDto) {
    return `This action updates a #${id} volunteerStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} volunteerStatus`;
  }
}
