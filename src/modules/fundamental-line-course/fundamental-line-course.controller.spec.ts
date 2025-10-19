import { Test, TestingModule } from '@nestjs/testing';
import { FundamentalLineCourseController } from './fundamental-line-course.controller';
import { FundamentalLineCourseService } from './fundamental-line-course.service';

describe('FundamentalLineCourseController', () => {
  let controller: FundamentalLineCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundamentalLineCourseController],
      providers: [FundamentalLineCourseService],
    }).compile();

    controller = module.get<FundamentalLineCourseController>(FundamentalLineCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
