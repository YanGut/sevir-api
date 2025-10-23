import { IsString, IsNotEmpty } from 'class-validator';

export class CreateGcParticipationTimeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
