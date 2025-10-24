import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePhoneNumberDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 24)
  number: string;
}
