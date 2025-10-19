import { Module } from '@nestjs/common';
import { AboutYouService } from './about-you.service';
import { AboutYouController } from './about-you.controller';

@Module({
  controllers: [AboutYouController],
  providers: [AboutYouService],
})
export class AboutYouModule {}
