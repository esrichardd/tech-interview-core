import { AbstractCrudHandler } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { Group } from '../entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { LoggerService } from '@libs/logger';
import { GroupTeamService } from './group-team.service';
import { GamesService } from 'src/games/services/games.service';

@Injectable()
export class GroupService extends AbstractCrudHandler<Group> {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    protected groupTeamService: GroupTeamService,
    protected readonly gamesService: GamesService,
    protected readonly loggerService: LoggerService,
  ) {
    super(groupRepository, loggerService);
  }

  async getGamesByGroup(groupId: string, date?: string) {
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);

      endOfDay.setHours(23, 59, 59, 999);
      return this.gamesService.findWithOptions({
        where: {
          group: { id: groupId },
          date: Between(startOfDay, endOfDay),
        },
        relations: ['localTeam', 'visitorTeam'],
      });
    }

    return this.gamesService.findWithOptions({
      where: {
        group: { id: groupId },
      },
      relations: ['localTeam', 'visitorTeam'],
    });
  }

  protected mapEntityToDto(entity: Group): any {
    return entity;
  }
}
