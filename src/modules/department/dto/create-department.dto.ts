import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @IsBoolean()
  @IsNotEmpty()
  inRequestQEOne: boolean;

  @IsBoolean()
  @IsNotEmpty()
  inRequestQETwo: boolean;
}
