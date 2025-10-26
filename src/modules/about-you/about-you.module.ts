import { Module } from '@nestjs/common';
import { AboutYouService } from './about-you.service';
import { AboutYouController } from './about-you.controller';
import { AboutYou } from './entities/about-you.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AboutYou])],
  controllers: [AboutYouController],
  providers: [AboutYouService],
  exports: [AboutYouService],
})
export class AboutYouModule {}
