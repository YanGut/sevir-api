import { Test, TestingModule } from '@nestjs/testing';
import { AboutYouService } from './about-you.service';

describe('AboutYouService', () => {
  let service: AboutYouService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutYouService],
    }).compile();

    service = module.get<AboutYouService>(AboutYouService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
