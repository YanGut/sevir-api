import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, IsDateString } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty({
    description: 'The ID of the product associated with this price',
    example: 1,
  })
  @IsInt()
  product_id: number;

  @ApiProperty({
    description: 'The price of the product',
    example: 24.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;

  @ApiProperty({
    description: 'The date the price was recorded',
    example: '2025-09-07',
    format: 'date',
  })
  @IsDateString()
  date: string; // YYYY-MM-DD
}
