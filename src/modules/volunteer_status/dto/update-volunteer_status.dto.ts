import { PartialType } from '@nestjs/mapped-types';
import { CreateVolunteerStatusDto } from './create-volunteer_status.dto';

export class UpdateVolunteerStatusDto extends PartialType(CreateVolunteerStatusDto) {}
