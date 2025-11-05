import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateVolunteerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  socialMediaLink: string;

  @IsString()
  @IsNotEmpty()
  age: string;

  @IsString()
  @IsOptional()
  responseQuestionOne: string;

  @IsString()
  @IsOptional()
  responseQuestionTwo: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 24)
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  nameGCLeader: string;

  @IsString()
  @IsNotEmpty()
  leaderContact: string;

  @IsString()
  departmentsParticipation: string;

  @IsString()
  @IsNotEmpty()
  gcParticipationTimeId: string;

  @IsString()
  @IsNotEmpty()
  fundamentalLineCourseId: string;

  @IsString()
  @IsNotEmpty()
  baptizedStatusId: string;

  @IsString()
  @IsNotEmpty()
  departmentId: string;

  @IsString()
  @IsOptional()
  volunteerStatusId?: string;
}
