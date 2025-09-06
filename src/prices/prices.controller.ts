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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './entities/price.entity';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get('min-recent')
  @ApiOperation({
    summary: 'Get the minimum recent price for each product',
    description:
      'For each product, this endpoint returns the lowest price recorded within a given number of days from the current date.',
  })
  @ApiQuery({
    name: 'days',
    required: false,
    type: Number,
    description: 'The number of past days to look for prices. Defaults to 14.',
    example: 30,
  })
  @ApiResponse({
    status: 200,
    description: 'A list of products with their minimum recent price.',
  })
  async getMinRecent(@Query('days') days?: string) {
    return this.pricesService.getMinRecent(Number(days));
  }

  @Get()
  @ApiOperation({ summary: 'List all prices with optional filters' })
  @ApiQuery({
    name: 'product_id',
    required: false,
    type: Number,
    description: 'Filter prices by product ID.',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
    description: 'The start date for the filter range (YYYY-MM-DD).',
    example: '2025-08-01',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: String,
    description: 'The end date for the filter range (YYYY-MM-DD).',
    example: '2025-08-31',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of prices.',
    type: [Price],
  })
  async findAll(
    @Query('product_id') product_id?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.pricesService.findAll({ product_id, start, end });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new price entry for a product' })
  @ApiResponse({
    status: 201,
    description: 'The price has been successfully created.',
    type: Price,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({
    status: 409,
    description: 'Price for this product and date already exists.',
  })
  async create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  // DYNAMIC ROUTES
  @Get(':id')
  @ApiOperation({ summary: 'Get a single price entry by its ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the price entry' })
  @ApiResponse({ status: 200, description: 'The found price entry.', type: Price })
  @ApiResponse({ status: 404, description: 'Price not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.findeOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a price entry' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the price entry to update' })
  @ApiResponse({
    status: 200,
    description: 'The price has been successfully updated.',
    type: Price,
  })
  @ApiResponse({ status: 404, description: 'Price or Product not found.' })
  @ApiResponse({
    status: 409,
    description: 'Price for this product and date already exists.',
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a price entry' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the price entry to delete' })
  @ApiResponse({
    status: 200,
    description: 'The price has been successfully deleted.',
    type: Price,
  })
  @ApiResponse({ status: 404, description: 'Price not found.' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricesService.remove(id);
  }
}
