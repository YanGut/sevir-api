import { Test, TestingModule } from '@nestjs/testing';
import { AboutYouController } from './about-you.controller';
import { AboutYouService } from './about-you.service';

describe('AboutYouController', () => {
  let controller: AboutYouController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutYouController],
      providers: [AboutYouService],
    }).compile();

    controller = module.get<AboutYouController>(AboutYouController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
