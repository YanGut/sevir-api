import { Test, TestingModule } from '@nestjs/testing';
import { BaptizedStatusController } from './baptized-status.controller';
import { BaptizedStatusService } from './baptized-status.service';

describe('BaptizedStatusController', () => {
  let controller: BaptizedStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaptizedStatusController],
      providers: [BaptizedStatusService],
    }).compile();

    controller = module.get<BaptizedStatusController>(BaptizedStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
