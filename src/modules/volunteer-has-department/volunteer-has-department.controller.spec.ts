import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerHasDepartmentController } from './volunteer-has-department.controller';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';

describe('VolunteerHasDepartmentController', () => {
  let controller: VolunteerHasDepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerHasDepartmentController],
      providers: [VolunteerHasDepartmentService],
    }).compile();

    controller = module.get<VolunteerHasDepartmentController>(VolunteerHasDepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
