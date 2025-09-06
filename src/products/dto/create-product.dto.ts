import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Arroz Tio João 5kg',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The EAN (barcode) of the product',
    example: '7896006700018',
    required: false,
  })
  @IsOptional()
  @IsString()
  ean?: string;
}
