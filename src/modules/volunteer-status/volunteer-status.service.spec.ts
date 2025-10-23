import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerStatusService } from './volunteer-status.service';

describe('VolunteerStatusService', () => {
  let service: VolunteerStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerStatusService],
    }).compile();

    service = module.get<VolunteerStatusService>(VolunteerStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
