import { PartialType } from '@nestjs/swagger';
import { CreateVolunteerStatusDto } from './create-volunteer-status.dto';

export class UpdateVolunteerStatusDto extends PartialType(CreateVolunteerStatusDto) {}
