import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateVolunteerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  socialMediaLink: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsNotEmpty()
  responseQuestionOne: string;

  @IsString()
  @IsNotEmpty()
  responseQuestionTwo: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 24)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  respInGC: string;

  @IsString()
  @IsNotEmpty()
  nameGCLeader: string;

  @IsString()
  @IsNotEmpty()
  leaderContact: string;

  @IsString()
  @IsNotEmpty()
  departmentsParticipation: string;

  @IsString()
  @IsNotEmpty()
  gcParticipationTimeId: string;

  @IsString()
  @IsNotEmpty()
  fundamentalLineCourseId: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @IsString()
  @IsOptional()
  volunteerStatusId?: string;
}
