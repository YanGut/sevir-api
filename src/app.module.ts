import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ProductsModule, PricesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
