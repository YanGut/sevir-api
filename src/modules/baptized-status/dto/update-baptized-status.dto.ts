import { PartialType } from '@nestjs/mapped-types';
import { CreateBaptizedStatusDto } from './create-baptized-status.dto';

export class UpdateBaptizedStatusDto extends PartialType(CreateBaptizedStatusDto) {}
