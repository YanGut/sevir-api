import { Module } from '@nestjs/common';
import { PhoneNumberService } from './phone-number.service';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumber } from './entities/phone-number.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber])],
  controllers: [PhoneNumberController],
  providers: [PhoneNumberService],
  exports: [PhoneNumberService],
})
export class PhoneNumberModule {}
