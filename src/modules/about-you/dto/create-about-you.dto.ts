import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAboutYouDto {
  @IsString()
  @IsNotEmpty()
  respInGc: string;

  @IsString()
  @IsNotEmpty()
  nameGcLeader: string;

  @IsString()
  @IsNotEmpty()
  leaderContact: string;

  @IsString()
  @IsNotEmpty()
  departmentParticipation: string;

  @IsString()
  @IsNotEmpty()
  gcParticipationTimeId: string;

  @IsString()
  @IsNotEmpty()
  fundamentalLineCourseId: string;
}

