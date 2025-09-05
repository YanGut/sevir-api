import { IsInt, IsNumber, Min, IsDateString } from 'class-validator';

export class CreatePriceDto {
  @IsInt()
  product_id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  price: number;

  @IsDateString()
  date: string; // YYYY-MM-DD
}
