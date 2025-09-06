import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Product } from 'src/products/entities/product.entity';
import { Price } from 'src/prices/entities/price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Price])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
