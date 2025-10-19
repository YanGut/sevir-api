import { Test, TestingModule } from '@nestjs/testing';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumberService } from './phone-number.service';

describe('PhoneNumberController', () => {
  let controller: PhoneNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneNumberController],
      providers: [PhoneNumberService],
    }).compile();

    controller = module.get<PhoneNumberController>(PhoneNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
