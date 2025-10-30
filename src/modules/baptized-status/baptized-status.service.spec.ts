import { Test, TestingModule } from '@nestjs/testing';
import { BaptizedStatusService } from './baptized-status.service';

describe('BaptizedStatusService', () => {
  let service: BaptizedStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaptizedStatusService],
    }).compile();

    service = module.get<BaptizedStatusService>(BaptizedStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
