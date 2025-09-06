import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Price } from 'src/prices/entities/price.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async run() {
    const productCount = await this.productRepository.count();
    if (productCount > 0) {
      this.logger.log('Skipping seed execution: Database is not empty.');
      return;
    }

    this.logger.log('Starting database seed...');
    await this.seedProductsAndPrices();
    this.logger.log('Database seeding completed.');
  }

  private async seedProductsAndPrices() {
    const productsData = [
      { name: 'Arroz Tio João 5kg', ean: '7896006700018' },
      { name: 'Feijão Carioca Kicaldo 1kg', ean: '7896416400031' },
      { name: 'Óleo de Soja Liza 900ml', ean: '7896036090038' },
      { name: 'Leite Integral Italac 1L', ean: '7898080640012' },
      { name: 'Café Pilão Tradicional 500g', ean: '7896089000017' },
    ];

    const createdProducts = await this.productRepository.save(productsData);
    this.logger.log(`Seeded ${createdProducts.length} products.`);

    const pricesData: DeepPartial<Price>[] = [];
    const today = new Date();

    for (const product of createdProducts) {
      for (let i = 0; i < 15; i++) { // 15 days of prices
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // Generate a slightly random price
        const basePrice = (product.id * 3.5) + 5;
        const price = (basePrice + (Math.random() - 0.5) * 2).toFixed(2);

        pricesData.push({
          product: product,
          price: price,
          date: date.toISOString().split('T')[0], // YYYY-MM-DD
        });
      }
    }

    const createdPrices = await this.priceRepository.save(pricesData);
    this.logger.log(`Seeded ${createdPrices.length} prices.`);
  }
}
