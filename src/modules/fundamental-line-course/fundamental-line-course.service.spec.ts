import { Test, TestingModule } from '@nestjs/testing';
import { FundamentalLineCourseService } from './fundamental-line-course.service';

describe('FundamentalLineCourseService', () => {
  let service: FundamentalLineCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundamentalLineCourseService],
    }).compile();

    service = module.get<FundamentalLineCourseService>(FundamentalLineCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
