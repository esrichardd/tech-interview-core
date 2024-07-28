import { IsNotEmpty, IsString } from 'class-validator';

export class TeamDto {
  @IsString()
  @IsNotEmpty()
  externalId: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
