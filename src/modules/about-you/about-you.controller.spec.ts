import { Test, TestingModule } from '@nestjs/testing';
import { AboutYouController } from './about-you.controller';
import { AboutYouService } from './about-you.service';
import { CreateAboutYouDto } from './dto/create-about-you.dto';
import { UpdateAboutYouDto } from './dto/update-about-you.dto';
import { AboutYou } from './entities/about-you.entity';

describe('AboutYouController', () => {
  let controller: AboutYouController;
  let service: AboutYouService;

  const mockAboutYouService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutYouController],
      providers: [
        {
          provide: AboutYouService,
          useValue: mockAboutYouService,
        },
      ],
    }).compile();

    controller = module.get<AboutYouController>(AboutYouController);
    service = module.get<AboutYouService>(AboutYouService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service to create an aboutYou', async () => {
      const createAboutYouDto: CreateAboutYouDto = {
        respInGc: 'Yes',
        nameGcLeader: 'Leader Name',
        leaderContact: 'Leader Contact',
        departmentParticipation: 'Department',
        gcParticipationTimeId: '1',
        fundamentalLineCourseId: '1',
      };
      const aboutYou = new AboutYou();
      mockAboutYouService.create.mockResolvedValue(aboutYou);

      const result = await controller.create(createAboutYouDto);

      expect(mockAboutYouService.create).toHaveBeenCalledWith(createAboutYouDto);
      expect(result).toEqual(aboutYou);
    });
  });

  describe('findAll', () => {
    it('should call the service to find all aboutYous', async () => {
      const aboutYous = [new AboutYou(), new AboutYou()];
      mockAboutYouService.findAll.mockResolvedValue(aboutYous);

      const result = await controller.findAll();

      expect(mockAboutYouService.findAll).toHaveBeenCalled();
      expect(result).toEqual(aboutYous);
    });
  });

  describe('findOne', () => {
    it('should call the service to find one aboutYou', async () => {
      const aboutYou = new AboutYou();
      mockAboutYouService.findOne.mockResolvedValue(aboutYou);

      const result = await controller.findOne('1');

      expect(mockAboutYouService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(aboutYou);
    });
  });

  describe('update', () => {
    it('should call the service to update an aboutYou', async () => {
      const updateAboutYouDto: UpdateAboutYouDto = {
        respInGc: 'No',
      };
      const aboutYou = new AboutYou();
      mockAboutYouService.update.mockResolvedValue(aboutYou);

      const result = await controller.update('1', updateAboutYouDto);

      expect(mockAboutYouService.update).toHaveBeenCalledWith('1', updateAboutYouDto);
      expect(result).toEqual(aboutYou);
    });
  });

  describe('remove', () => {
    it('should call the service to remove an aboutYou', async () => {
      mockAboutYouService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(mockAboutYouService.remove).toHaveBeenCalledWith('1');
    });
  });
});
