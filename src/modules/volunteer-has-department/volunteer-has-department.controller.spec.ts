import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerHasDepartmentController } from './volunteer-has-department.controller';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { CreateVolunteerHasDepartmentDto } from './dto/create-volunteer-has-department.dto';
import { UpdateVolunteerHasDepartmentDto } from './dto/update-volunteer-has-department.dto';
import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';

describe('VolunteerHasDepartmentController', () => {
  let controller: VolunteerHasDepartmentController;
  let service: VolunteerHasDepartmentService;

  const mockVolunteerHasDepartmentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerHasDepartmentController],
      providers: [
        {
          provide: VolunteerHasDepartmentService,
          useValue: mockVolunteerHasDepartmentService,
        },
      ],
    }).compile();

    controller = module.get<VolunteerHasDepartmentController>(VolunteerHasDepartmentController);
    service = module.get<VolunteerHasDepartmentService>(VolunteerHasDepartmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the service to create a volunteerHasDepartment', async () => {
      const createVolunteerHasDepartmentDto: CreateVolunteerHasDepartmentDto = {
        volunteerId: '1',
        departmentId: '1',
        volunteerStatusId: '1',
      };
      const volunteerHasDepartment = new VolunteerHasDepartment();
      mockVolunteerHasDepartmentService.create.mockResolvedValue(volunteerHasDepartment);

      const result = await controller.create(createVolunteerHasDepartmentDto);

      expect(mockVolunteerHasDepartmentService.create).toHaveBeenCalledWith(createVolunteerHasDepartmentDto);
      expect(result).toEqual(volunteerHasDepartment);
    });
  });

  describe('findAll', () => {
    it('should call the service to find all volunteerHasDepartments', async () => {
      const volunteerHasDepartments = [new VolunteerHasDepartment(), new VolunteerHasDepartment()];
      mockVolunteerHasDepartmentService.findAll.mockResolvedValue(volunteerHasDepartments);

      const result = await controller.findAll();

      expect(mockVolunteerHasDepartmentService.findAll).toHaveBeenCalled();
      expect(result).toEqual(volunteerHasDepartments);
    });
  });

  describe('findOne', () => {
    it('should call the service to find one volunteerHasDepartment', async () => {
      const volunteerHasDepartment = new VolunteerHasDepartment();
      mockVolunteerHasDepartmentService.findOne.mockResolvedValue(volunteerHasDepartment);

      const result = await controller.findOne('1');

      expect(mockVolunteerHasDepartmentService.findOne).toHaveBeenCalledWith('1');
      expect(result).toEqual(volunteerHasDepartment);
    });
  });

  describe('update', () => {
    it('should call the service to update a volunteerHasDepartment', async () => {
      const updateVolunteerHasDepartmentDto: UpdateVolunteerHasDepartmentDto = {
        departmentId: '2',
      };
      const volunteerHasDepartment = new VolunteerHasDepartment();
      mockVolunteerHasDepartmentService.update.mockResolvedValue(volunteerHasDepartment);

      const result = await controller.update('1', updateVolunteerHasDepartmentDto);

      expect(mockVolunteerHasDepartmentService.update).toHaveBeenCalledWith('1', updateVolunteerHasDepartmentDto);
      expect(result).toEqual(volunteerHasDepartment);
    });
  });

  describe('remove', () => {
    it('should call the service to remove a volunteerHasDepartment', async () => {
      mockVolunteerHasDepartmentService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(mockVolunteerHasDepartmentService.remove).toHaveBeenCalledWith('1');
    });
  });
});
