import { Test, TestingModule } from '@nestjs/testing';
import { GcParticipationTimeController } from './gc-participation-time.controller';
import { GcParticipationTimeService } from './gc-participation-time.service';

describe('GcParticipationTimeController', () => {
  let controller: GcParticipationTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GcParticipationTimeController],
      providers: [GcParticipationTimeService],
    }).compile();

    controller = module.get<GcParticipationTimeController>(GcParticipationTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
