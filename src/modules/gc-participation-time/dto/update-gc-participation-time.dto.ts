import { PartialType } from '@nestjs/mapped-types';
import { CreateGcParticipationTimeDto } from './create-gc-participation-time.dto';

export class UpdateGcParticipationTimeDto extends PartialType(CreateGcParticipationTimeDto) {}
