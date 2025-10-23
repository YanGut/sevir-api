import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFundamentalLineCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
