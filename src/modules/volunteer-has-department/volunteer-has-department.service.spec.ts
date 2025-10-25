import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VolunteerHasDepartment } from './entities/volunteer-has-department.entity';
import { Repository } from 'typeorm';
import { CreateVolunteerHasDepartmentDto } from './dto/create-volunteer-has-department.dto';
import { UpdateVolunteerHasDepartmentDto } from './dto/update-volunteer-has-department.dto';
import { NotFoundException } from '@nestjs/common';

describe('VolunteerHasDepartmentService', () => {
  let service: VolunteerHasDepartmentService;
  let repository: Repository<VolunteerHasDepartment>;

  const mockVolunteerHasDepartmentRepository = {
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
        VolunteerHasDepartmentService,
        {
          provide: getRepositoryToken(VolunteerHasDepartment),
          useValue: mockVolunteerHasDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<VolunteerHasDepartmentService>(VolunteerHasDepartmentService);
    repository = module.get<Repository<VolunteerHasDepartment>>(getRepositoryToken(VolunteerHasDepartment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a volunteerHasDepartment', async () => {
      const createVolunteerHasDepartmentDto: CreateVolunteerHasDepartmentDto = {
        volunteerId: '1',
        departmentId: '1',
        volunteerStatusId: '1',
      };
      const volunteerHasDepartment = new VolunteerHasDepartment();
      mockVolunteerHasDepartmentRepository.create.mockReturnValue(volunteerHasDepartment);
      mockVolunteerHasDepartmentRepository.save.mockResolvedValue(volunteerHasDepartment);

      const result = await service.create(createVolunteerHasDepartmentDto);

      expect(mockVolunteerHasDepartmentRepository.create).toHaveBeenCalledWith(createVolunteerHasDepartmentDto);
      expect(mockVolunteerHasDepartmentRepository.save).toHaveBeenCalledWith(volunteerHasDepartment);
      expect(result).toEqual(volunteerHasDepartment);
    });
  });

  describe('findAll', () => {
    it('should return an array of volunteerHasDepartments', async () => {
      const volunteerHasDepartments = [new VolunteerHasDepartment(), new VolunteerHasDepartment()];
      mockVolunteerHasDepartmentRepository.find.mockResolvedValue(volunteerHasDepartments);

      const result = await service.findAll();

      expect(mockVolunteerHasDepartmentRepository.find).toHaveBeenCalledWith({ relations: ['volunteer', 'department', 'volunteerStatus'] });
      expect(result).toEqual(volunteerHasDepartments);
    });
  });

  describe('findOne', () => {
    it('should return a volunteerHasDepartment if found', async () => {
      const volunteerHasDepartment = new VolunteerHasDepartment();
      mockVolunteerHasDepartmentRepository.findOne.mockResolvedValue(volunteerHasDepartment);

      const result = await service.findOne('1');

      expect(mockVolunteerHasDepartmentRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['volunteer', 'department', 'volunteerStatus'] });
      expect(result).toEqual(volunteerHasDepartment);
    });

    it('should throw a NotFoundException if volunteerHasDepartment is not found', async () => {
      mockVolunteerHasDepartmentRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a volunteerHasDepartment', async () => {
      const updateVolunteerHasDepartmentDto: UpdateVolunteerHasDepartmentDto = {
        departmentId: '2',
      };
      const volunteerHasDepartment = new VolunteerHasDepartment();
      mockVolunteerHasDepartmentRepository.preload.mockResolvedValue(volunteerHasDepartment);
      mockVolunteerHasDepartmentRepository.save.mockResolvedValue(volunteerHasDepartment);

      const result = await service.update('1', updateVolunteerHasDepartmentDto);

      expect(mockVolunteerHasDepartmentRepository.preload).toHaveBeenCalledWith({ id: '1', ...updateVolunteerHasDepartmentDto });
      expect(mockVolunteerHasDepartmentRepository.save).toHaveBeenCalledWith(volunteerHasDepartment);
      expect(result).toEqual(volunteerHasDepartment);
    });

    it('should throw a NotFoundException if volunteerHasDepartment to update is not found', async () => {
      const updateVolunteerHasDepartmentDto: UpdateVolunteerHasDepartmentDto = {
        departmentId: '2',
      };
      mockVolunteerHasDepartmentRepository.preload.mockResolvedValue(null);

      await expect(service.update('1', updateVolunteerHasDepartmentDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a volunteerHasDepartment', async () => {
      const volunteerHasDepartment = new VolunteerHasDepartment();
      jest.spyOn(service, 'findOne').mockResolvedValue(volunteerHasDepartment);
      mockVolunteerHasDepartmentRepository.remove.mockResolvedValue(undefined);

      await service.remove('1');

      expect(service.findOne).toHaveBeenCalledWith('1');
      expect(mockVolunteerHasDepartmentRepository.remove).toHaveBeenCalledWith(volunteerHasDepartment);
    });

    it('should throw a NotFoundException if volunteerHasDepartment to remove is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
