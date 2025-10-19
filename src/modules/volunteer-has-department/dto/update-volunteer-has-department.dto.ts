import { PartialType } from '@nestjs/mapped-types';
import { CreateVolunteerHasDepartmentDto } from './create-volunteer-has-department.dto';

export class UpdateVolunteerHasDepartmentDto extends PartialType(CreateVolunteerHasDepartmentDto) {}
