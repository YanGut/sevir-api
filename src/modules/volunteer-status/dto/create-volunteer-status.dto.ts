import { IsString, IsNotEmpty } from 'class-validator';

export class CreateVolunteerStatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
