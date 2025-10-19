import { Test, TestingModule } from '@nestjs/testing';
import { GcParticipationTimeService } from './gc-participation-time.service';

describe('GcParticipationTimeService', () => {
  let service: GcParticipationTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GcParticipationTimeService],
    }).compile();

    service = module.get<GcParticipationTimeService>(GcParticipationTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
