import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';

import { PhoneNumberService } from '../phone-number/phone-number.service';
import { FundamentalLineCourseService } from '../fundamental-line-course/fundamental-line-course.service';
import { GcParticipationTimeService } from '../gc-participation-time/gc-participation-time.service';
import { DepartmentService } from '../department/department.service';
import { VolunteerStatusService } from '../volunteer-status/volunteer-status.service';
import { VolunteerHasDepartmentService } from '../volunteer-has-department/volunteer-has-department.service';

import { Volunteer } from './entities/volunteer.entity';
import { AboutYou } from '../about-you/entities/about-you.entity';
import { Department } from '../department/entities/department.entity';
import { VolunteerStatus } from '../volunteer-status/entities/volunteer-status.entity';
import { GcParticipationTime } from '../gc-participation-time/entities/gc-participation-time.entity';
import { FundamentalLineCourse } from '../fundamental-line-course/entities/fundamental-line-course.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(Volunteer)
    private readonly volunteerRepository: Repository<Volunteer>,
    private readonly phoneNumberService: PhoneNumberService,
    private readonly fundamentalLineCourseService: FundamentalLineCourseService,
    private readonly gcParticipationTimeService: GcParticipationTimeService,
    private readonly departmentService: DepartmentService,
    private readonly volunteerStatusService: VolunteerStatusService,
    private readonly volunteerHasDepartmentService: VolunteerHasDepartmentService,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createVolunteerDto: CreateVolunteerDto): Promise<Volunteer> {
    return this.entityManager.transaction(async (transactionalEntityManager) => {
      const {
        phoneNumber: number,
        fundamentalLineCourseId,
        gcParticipationTimeId,
        departmentId,
        volunteerStatusId,
        ...restOfDto
      } = createVolunteerDto;

      const phoneNumber = await this.phoneNumberService.create({ number });

      const fundamentalLineCourse: FundamentalLineCourse | null =
        await this.fundamentalLineCourseService.findOne(fundamentalLineCourseId);
      if (!fundamentalLineCourse)
        throw new NotFoundException(
          `FundamentalLineCourse with ID ''${fundamentalLineCourseId}'' not found`,
        );

      const gcParticipationTime: GcParticipationTime | null =
        await this.gcParticipationTimeService.findOne(gcParticipationTimeId);
      if (!gcParticipationTime)
        throw new NotFoundException(
          `GcParticipationTime with ID ''${gcParticipationTimeId}'' not found`,
        );

      const aboutYouToCreate = new AboutYou();
      aboutYouToCreate.respInGc = restOfDto.respInGC;
      aboutYouToCreate.nameGcLeader = restOfDto.nameGCLeader;
      aboutYouToCreate.leaderContact = restOfDto.leaderContact;
      aboutYouToCreate.departmentParticipation = restOfDto.departmentsParticipation;
      aboutYouToCreate.fundamentalLineCourse = fundamentalLineCourse;
      aboutYouToCreate.gcParticipationTime = gcParticipationTime;

      const aboutYou = await transactionalEntityManager.save(aboutYouToCreate);

      const volunteerToCreate = new Volunteer();
      volunteerToCreate.name = restOfDto.name;
      volunteerToCreate.socialMediaLink = restOfDto.socialMediaLink;
      volunteerToCreate.age = restOfDto.age;
      volunteerToCreate.responseQEOne = restOfDto.responseQuestionOne;
      volunteerToCreate.responseQETwo = restOfDto.responseQuestionTwo;
      volunteerToCreate.phoneNumber = phoneNumber;
      volunteerToCreate.aboutYou = aboutYou;

      const volunteer = await transactionalEntityManager.save(volunteerToCreate);

      const department: Department | null = await this.departmentService.findOne(departmentId);
      if (!department)
        throw new NotFoundException(`Department with ID ''${departmentId}'' not found`);

      const volunteerStatus: VolunteerStatus | null = volunteerStatusId
        ? await this.volunteerStatusService.findOne(volunteerStatusId)
        : await this.volunteerStatusService.getDefaultStatus();
      if (!volunteerStatus)
        throw new NotFoundException(`VolunteerStatus with ID ''${volunteerStatusId}'' not found`);

      await this.volunteerHasDepartmentService.assign(
        volunteer,
        department,
        volunteerStatus,
        transactionalEntityManager,
      );

      return volunteer;
    });
  }

  findAll() {
    return this.volunteerRepository.find({
      relations: [
        'phoneNumber',
        'aboutYou',
        'aboutYou.gcParticipationTime',
        'aboutYou.fundamentalLineCourse',
      ],
    });
  }

  async findOne(id: string): Promise<Volunteer> {
    const volunteer = await this.volunteerRepository.findOne({
      where: { id },
      relations: [
        'phoneNumber',
        'aboutYou',
        'aboutYou.gcParticipationTime',
        'aboutYou.fundamentalLineCourse',
      ],
    });
    if (!volunteer) {
      throw new NotFoundException(`Volunteer with ID ''${id}'' not found`);
    }
    return volunteer;
  }

  async update(id: string, updateVolunteerDto: UpdateVolunteerDto): Promise<Volunteer> {
    return this.entityManager.transaction(async (transactionalEntityManager) => {
      const volunteer = await transactionalEntityManager.findOne(Volunteer, {
        where: { id },
        relations: [
          'phoneNumber',
          'aboutYou',
          'aboutYou.gcParticipationTime',
          'aboutYou.fundamentalLineCourse',
        ],
      });

      if (!volunteer) {
        throw new NotFoundException(`Volunteer with ID ''${id}'' not found`);
      }

      const {
        phoneNumber: number,
        fundamentalLineCourseId,
        gcParticipationTimeId,
        departmentId,
        volunteerStatusId,
        name,
        socialMediaLink,
        age,
        responseQuestionOne,
        responseQuestionTwo,
        respInGC,
        nameGCLeader,
        leaderContact,
        departmentsParticipation,
      } = updateVolunteerDto;

      if (number) {
        const phoneNumber = await this.phoneNumberService.create({ number });
        volunteer.phoneNumber = phoneNumber;
      }

      const aboutYou = volunteer.aboutYou;
      if (!aboutYou)
        throw new NotFoundException('Volunteer does not have an associated AboutYou entity.');

      if (fundamentalLineCourseId) {
        const fundamentalLineCourse =
          await this.fundamentalLineCourseService.findOne(fundamentalLineCourseId);
        if (!fundamentalLineCourse)
          throw new NotFoundException(
            `FundamentalLineCourse with ID ''${fundamentalLineCourseId}'' not found`,
          );
        aboutYou.fundamentalLineCourse = fundamentalLineCourse;
      }

      if (gcParticipationTimeId) {
        const gcParticipationTime =
          await this.gcParticipationTimeService.findOne(gcParticipationTimeId);
        if (!gcParticipationTime)
          throw new NotFoundException(
            `GcParticipationTime with ID ''${gcParticipationTimeId}'' not found`,
          );
        aboutYou.gcParticipationTime = gcParticipationTime;
      }

      if (departmentId) {
        const department = await this.departmentService.findOne(departmentId);
        if (!department)
          throw new NotFoundException(`Department with ID ''${departmentId}'' not found`);

        const volunteerStatus = volunteerStatusId
          ? await this.volunteerStatusService.findOne(volunteerStatusId)
          : await this.volunteerStatusService.getDefaultStatus();
        if (!volunteerStatus)
          throw new NotFoundException(`VolunteerStatus with ID ''${volunteerStatusId}'' not found`);

        await this.volunteerHasDepartmentService.assign(
          volunteer,
          department,
          volunteerStatus,
          transactionalEntityManager,
        );
      }

      const aboutYouUpdateData = {
        respInGc: respInGC,
        nameGcLeader: nameGCLeader,
        leaderContact,
        departmentParticipation: departmentsParticipation,
      };
      Object.keys(aboutYouUpdateData).forEach(
        (key: string) => aboutYouUpdateData[key] === undefined && delete aboutYouUpdateData[key],
      );
      transactionalEntityManager.merge(AboutYou, aboutYou, aboutYouUpdateData);
      await transactionalEntityManager.save(aboutYou);

      const volunteerUpdateData = {
        name,
        socialMediaLink,
        age,
        responseQEOne: responseQuestionOne,
        responseQETwo: responseQuestionTwo,
      };
      Object.keys(volunteerUpdateData).forEach(
        (key) => volunteerUpdateData[key] === undefined && delete volunteerUpdateData[key],
      );
      transactionalEntityManager.merge(Volunteer, volunteer, volunteerUpdateData);
      const updatedVolunteer = await transactionalEntityManager.save(volunteer);

      return updatedVolunteer;
    });
  }

  async remove(id: string): Promise<void> {
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const volunteer = await transactionalEntityManager.findOne(Volunteer, {
        where: { id },
        relations: ['aboutYou'],
      });

      if (!volunteer) {
        throw new NotFoundException(`Volunteer with ID ''${id}'' not found`);
      }

      if (volunteer.aboutYou) {
        await transactionalEntityManager.delete(AboutYou, { id: volunteer.aboutYou.id });
      }

      await transactionalEntityManager.delete(Volunteer, { id });
    });
  }
}
