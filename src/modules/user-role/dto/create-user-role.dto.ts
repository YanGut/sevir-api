import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
