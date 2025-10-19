import { Injectable } from '@nestjs/common';
import { CreateAboutYouDto } from './dto/create-about-you.dto';
import { UpdateAboutYouDto } from './dto/update-about-you.dto';

@Injectable()
export class AboutYouService {
  create(createAboutYouDto: CreateAboutYouDto) {
    return 'This action adds a new aboutYou';
  }

  findAll() {
    return `This action returns all aboutYou`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aboutYou`;
  }

  update(id: number, updateAboutYouDto: UpdateAboutYouDto) {
    return `This action updates a #${id} aboutYou`;
  }

  remove(id: number) {
    return `This action removes a #${id} aboutYou`;
  }
}
