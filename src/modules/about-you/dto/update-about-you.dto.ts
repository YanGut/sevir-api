import { PartialType } from '@nestjs/mapped-types';
import { CreateAboutYouDto } from './create-about-you.dto';

export class UpdateAboutYouDto extends PartialType(CreateAboutYouDto) {}
