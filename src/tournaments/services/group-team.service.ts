import { AbstractCrudHandler } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { GroupTeam } from '../entities/group-team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from '@libs/logger';
import { Repository } from 'typeorm';

@Injectable()
export class GroupTeamService extends AbstractCrudHandler<GroupTeam> {
  constructor(
    @InjectRepository(GroupTeam)
    private groupTeamRepository: Repository<GroupTeam>,
    protected readonly loggerService: LoggerService,
  ) {
    super(groupTeamRepository, loggerService);
  }

  protected mapEntityToDto(entity: GroupTeam): any {
    return entity;
  }
}
