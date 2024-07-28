import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractCrudHandler } from '@libs/utils';
import { LoggerService } from '@libs/logger';
import { TeamResponseDto } from '@libs/sdk-gateway-dto';
import { Team } from '../entities/team.entity';

@Injectable()
export class TeamsService extends AbstractCrudHandler<Team> {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    protected readonly loggerService: LoggerService,
  ) {
    super(teamRepository, loggerService);
  }

  protected mapEntityToDto(entity: Team): TeamResponseDto {
    return plainToInstance(TeamResponseDto, entity);
  }
}
