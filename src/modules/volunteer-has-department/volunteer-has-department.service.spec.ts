import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerHasDepartmentService } from './volunteer-has-department.service';

describe('VolunteerHasDepartmentService', () => {
  let service: VolunteerHasDepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerHasDepartmentService],
    }).compile();

    service = module.get<VolunteerHasDepartmentService>(VolunteerHasDepartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
