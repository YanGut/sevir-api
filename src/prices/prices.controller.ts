import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get('min-recent')
  async getMinRecent(@Query('days') days?: string) {
    return this.pricesService.getMinRecent(Number(days));
  }

  @Get()
  async findAll(
    @Query('product_id') product_id?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.pricesService.findAll({ product_id, start, end });
  }

  @Post()
  async create(@Body() CreatePriceDto: CreatePriceDto) {
    return this.pricesService.create(CreatePriceDto);
  }

  // DYNAMIC ROUTES
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.findeOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.remove(id);
  }
}
