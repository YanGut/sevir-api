import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAboutYouDto } from './dto/create-about-you.dto';
import { UpdateAboutYouDto } from './dto/update-about-you.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AboutYou } from './entities/about-you.entity';
import { Repository } from 'typeorm';
import { GcParticipationTimeService } from '../gc-participation-time/gc-participation-time.service';
import { FundamentalLineCourseService } from '../fundamental-line-course/fundamental-line-course.service';
import { BaptizedStatusService } from '../baptized-status/baptized-status.service';

@Injectable()
export class AboutYouService {
  constructor(
    @InjectRepository(AboutYou)
    private readonly aboutYouRepository: Repository<AboutYou>,
    private readonly gcParticipationTimeService: GcParticipationTimeService,
    private readonly fundamentalLineCourseService: FundamentalLineCourseService,
    private readonly baptizedStatusService: BaptizedStatusService,
  ) {}

  async create(createAboutYouDto: CreateAboutYouDto): Promise<AboutYou> {
    const { gcParticipationTimeId, fundamentalLineCourseId, baptizedStatusId, ...rest } =
      createAboutYouDto;

    const gcParticipationTime =
      await this.gcParticipationTimeService.findOne(gcParticipationTimeId);
    if (!gcParticipationTime)
      throw new NotFoundException(
        `GcParticipationTime with ID ''${gcParticipationTimeId}'' not found`,
      );

    const fundamentalLineCourse =
      await this.fundamentalLineCourseService.findOne(fundamentalLineCourseId);
    if (!fundamentalLineCourse)
      throw new NotFoundException(
        `FundamentalLineCourse with ID ''${fundamentalLineCourseId}'' not found`,
      );

    const baptizedStatus = await this.baptizedStatusService.findOne(baptizedStatusId);
    if (!baptizedStatus)
      throw new NotFoundException(`BaptizedStatus with ID ''${baptizedStatusId}'' not found`);

    const aboutYou = this.aboutYouRepository.create({
      ...rest,
      gcParticipationTime,
      fundamentalLineCourse,
      baptizedStatus,
    });
    return this.aboutYouRepository.save(aboutYou);
  }

  async findAll(): Promise<AboutYou[]> {
    return this.aboutYouRepository.find({
      relations: ['gcParticipationTime', 'fundamentalLineCourse', 'baptizedStatus'],
    });
  }

  async findOne(id: string): Promise<AboutYou> {
    const aboutYou = await this.aboutYouRepository.findOne({
      where: { id },
      relations: ['gcParticipationTime', 'fundamentalLineCourse', 'baptizedStatus'],
    });
    if (!aboutYou) {
      throw new NotFoundException(`AboutYou with ID "${id}" not found`);
    }
    return aboutYou;
  }

  async update(id: string, updateAboutYouDto: UpdateAboutYouDto): Promise<AboutYou> {
    const aboutYou = await this.aboutYouRepository.findOne({
      where: { id },
      relations: ['gcParticipationTime', 'fundamentalLineCourse', 'baptizedStatus'],
    });
    if (!aboutYou) {
      throw new NotFoundException(`AboutYou with ID "${id}" not found`);
    }

    const { gcParticipationTimeId, fundamentalLineCourseId, baptizedStatusId, ...rest } =
      updateAboutYouDto;

    if (gcParticipationTimeId) {
      const gcParticipationTime =
        await this.gcParticipationTimeService.findOne(gcParticipationTimeId);
      if (!gcParticipationTime)
        throw new NotFoundException(
          `GcParticipationTime with ID ''${gcParticipationTimeId}'' not found`,
        );
      aboutYou.gcParticipationTime = gcParticipationTime;
    }

    if (fundamentalLineCourseId) {
      const fundamentalLineCourse =
        await this.fundamentalLineCourseService.findOne(fundamentalLineCourseId);
      if (!fundamentalLineCourse)
        throw new NotFoundException(
          `FundamentalLineCourse with ID ''${fundamentalLineCourseId}'' not found`,
        );
      aboutYou.fundamentalLineCourse = fundamentalLineCourse;
    }

    if (baptizedStatusId) {
      const baptizedStatus = await this.baptizedStatusService.findOne(baptizedStatusId);
      if (!baptizedStatus)
        throw new NotFoundException(`BaptizedStatus with ID ''${baptizedStatusId}'' not found`);
      aboutYou.baptizedStatus = baptizedStatus;
    }

    const { nameGcLeader, leaderContact, departmentParticipation } = rest;

    if (nameGcLeader !== undefined) {
      aboutYou.nameGcLeader = nameGcLeader;
    }
    if (leaderContact !== undefined) {
      aboutYou.leaderContact = leaderContact;
    }
    if (departmentParticipation !== undefined) {
      aboutYou.departmentParticipation = departmentParticipation;
    }

    return this.aboutYouRepository.save(aboutYou);
  }

  async remove(id: string): Promise<void> {
    const aboutYou = await this.findOne(id);
    await this.aboutYouRepository.remove(aboutYou);
  }
}
