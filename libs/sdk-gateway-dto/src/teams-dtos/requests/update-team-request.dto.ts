import { PartialType } from '@nestjs/swagger';
import { TeamDto } from '../common';

export class UpdateTeamRequestDto extends PartialType(TeamDto) {}
