import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerStatusController } from './volunteer-status.controller';
import { VolunteerStatusService } from './volunteer-status.service';

describe('VolunteerStatusController', () => {
  let controller: VolunteerStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerStatusController],
      providers: [VolunteerStatusService],
    }).compile();

    controller = module.get<VolunteerStatusController>(VolunteerStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
