import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVolunteerHasDepartmentDto {
  @IsString()
  @IsNotEmpty()
  volunteerId: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @IsString()
  @IsNotEmpty()
  volunteerStatusId: string;
}
