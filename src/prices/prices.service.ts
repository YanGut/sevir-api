import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findeOne(id: number) {
    const price = await this.priceRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!price) throw new NotFoundException('Preço não encontrado');
    return price;
  }

  async findAll(filters?: {
    product_id?: number;
    start?: string;
    end?: string;
  }) {
    const qb = this.priceRepository
      .createQueryBuilder('price')
      .leftJoinAndSelect('price.product', 'product');

    if (filters?.product_id)
      qb.andWhere('product.id = :productId', { productId: filters.product_id });
    if (filters?.start)
      qb.andWhere('price.date >= :start', { start: filters?.start });
    if (filters?.end) qb.andWhere('price.date <= :end', { end: filters.end });

    return qb.getMany();
  }

  async create(createPriceDto: CreatePriceDto) {
    const product = await this.productRepository.findOneBy({
      id: createPriceDto.product_id,
    });

    if (!product) throw new NotFoundException('Produto não encontrado');

    const priceEntity = this.priceRepository.create({
      product,
      price: createPriceDto.price.toFixed(2),
      date: createPriceDto.date,
    });

    try {
      return await this.priceRepository.save(priceEntity);
    } catch (error) {
      if (error?.driverError?.code === '23505') {
        throw new ConflictException('Preço já cadastrado para essa data');
      }
      throw error;
    }
  }

  async update(id: number, updatePriceDto: UpdatePriceDto) {
    const price = await this.findeOne(id);

    if (
      updatePriceDto.product_id &&
      updatePriceDto.product_id !== price.product.id
    ) {
      const newProduct = await this.productRepository.findOneBy({
        id: updatePriceDto.product_id,
      });
      if (!newProduct) throw new NotFoundException('Produto não encontrado');
      price.product = newProduct;
    }

    if (updatePriceDto.price) price.price = updatePriceDto.price.toFixed(2);
    if (updatePriceDto.date) price.date = updatePriceDto.date;

    try {
      return await this.priceRepository.save(price);
    } catch (error) {
      if (error?.driverError?.code === '23505') {
        throw new ConflictException('Preço já cadastrado para essa data');
      }
      throw error;
    }
  }

  async remove(id: number) {
    const price = await this.findeOne(id);
    return this.priceRepository.remove(price);
  }

  async getMinRecent(days = 14) {
    const d = Number(days) || 14;
    const sql = `
      SELECT s.product_id::int, s.product_name, s.min_price, s.min_date
      FROM (
        SELECT pr.product_id,
              p.name AS product_name,
              pr.price::text AS min_price,
              pr.date AS min_date,
              ROW_NUMBER() OVER (PARTITION BY pr.product_id ORDER BY pr.price::numeric ASC, pr.date ASC) rn
        FROM price pr
        JOIN product p ON p.id = pr.product_id
        WHERE pr.date >= (current_date - INTERVAL '${d} days')
      ) s
      WHERE s.rn = 1;
    `;
    const rows = await this.priceRepository.query(sql);
    return rows.map((r) => ({
      product_id: Number(r.product_id),
      product_name: r.product_name,
      min_price: parseFloat(r.min_price),
      min_date: r.min_date,
    }));
  }
}
