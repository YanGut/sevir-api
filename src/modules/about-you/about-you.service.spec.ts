import { Test, TestingModule } from '@nestjs/testing';
import { AboutYouService } from './about-you.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AboutYou } from './entities/about-you.entity';
import { Repository } from 'typeorm';
import { CreateAboutYouDto } from './dto/create-about-you.dto';
import { UpdateAboutYouDto } from './dto/update-about-you.dto';
import { NotFoundException } from '@nestjs/common';

describe('AboutYouService', () => {
  let service: AboutYouService;
  let repository: Repository<AboutYou>;

  const mockAboutYouRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AboutYouService,
        {
          provide: getRepositoryToken(AboutYou),
          useValue: mockAboutYouRepository,
        },
      ],
    }).compile();

    service = module.get<AboutYouService>(AboutYouService);
    repository = module.get<Repository<AboutYou>>(getRepositoryToken(AboutYou));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an aboutYou', async () => {
      const createAboutYouDto: CreateAboutYouDto = {
        respInGc: 'Yes',
        nameGcLeader: 'Leader Name',
        leaderContact: 'Leader Contact',
        departmentParticipation: 'Department',
        gcParticipationTimeId: '1',
        fundamentalLineCourseId: '1',
      };
      const aboutYou = new AboutYou();
      mockAboutYouRepository.create.mockReturnValue(aboutYou);
      mockAboutYouRepository.save.mockResolvedValue(aboutYou);

      const result = await service.create(createAboutYouDto);

      expect(mockAboutYouRepository.create).toHaveBeenCalledWith(createAboutYouDto);
      expect(mockAboutYouRepository.save).toHaveBeenCalledWith(aboutYou);
      expect(result).toEqual(aboutYou);
    });
  });

  describe('findAll', () => {
    it('should return an array of aboutYous', async () => {
      const aboutYous = [new AboutYou(), new AboutYou()];
      mockAboutYouRepository.find.mockResolvedValue(aboutYous);

      const result = await service.findAll();

      expect(mockAboutYouRepository.find).toHaveBeenCalled();
      expect(result).toEqual(aboutYous);
    });
  });

  describe('findOne', () => {
    it('should return an aboutYou if found', async () => {
      const aboutYou = new AboutYou();
      mockAboutYouRepository.findOne.mockResolvedValue(aboutYou);

      const result = await service.findOne('1');

      expect(mockAboutYouRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(aboutYou);
    });

    it('should throw a NotFoundException if aboutYou is not found', async () => {
      mockAboutYouRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return an aboutYou', async () => {
      const updateAboutYouDto: UpdateAboutYouDto = {
        respInGc: 'No',
      };
      const aboutYou = new AboutYou();
      mockAboutYouRepository.preload.mockResolvedValue(aboutYou);
      mockAboutYouRepository.save.mockResolvedValue(aboutYou);

      const result = await service.update('1', updateAboutYouDto);

      expect(mockAboutYouRepository.preload).toHaveBeenCalledWith({ id: '1', ...updateAboutYouDto });
      expect(mockAboutYouRepository.save).toHaveBeenCalledWith(aboutYou);
      expect(result).toEqual(aboutYou);
    });

    it('should throw a NotFoundException if aboutYou to update is not found', async () => {
      const updateAboutYouDto: UpdateAboutYouDto = {
        respInGc: 'No',
      };
      mockAboutYouRepository.preload.mockResolvedValue(null);

      await expect(service.update('1', updateAboutYouDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an aboutYou', async () => {
      const aboutYou = new AboutYou();
      jest.spyOn(service, 'findOne').mockResolvedValue(aboutYou);
      mockAboutYouRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(mockAboutYouRepository.remove).toHaveBeenCalledWith(aboutYou);
    });

    it('should throw a NotFoundException if aboutYou to remove is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
