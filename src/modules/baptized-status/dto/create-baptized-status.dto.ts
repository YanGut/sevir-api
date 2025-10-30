import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBaptizedStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

