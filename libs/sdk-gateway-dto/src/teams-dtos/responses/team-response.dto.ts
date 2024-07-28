import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { TeamDto } from '../common/team.dto';
import { Type } from 'class-transformer';

export class TeamResponseDto extends TeamDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}
