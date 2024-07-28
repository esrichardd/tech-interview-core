import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractCrudHandler } from '@libs/utils';
import { LoggerService } from '@libs/logger';
import { Game } from '../entites/game.entity';

@Injectable()
export class GamesService extends AbstractCrudHandler<Game> {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    protected readonly loggerService: LoggerService,
  ) {
    super(gameRepository, loggerService);
  }

  findGameWithTeams(id: string): Promise<Game> {
    return this.gameRepository.findOne({
      where: { id },
      relations: ['tournament', 'localTeam', 'visitorTeam'],
    });
  }

  protected mapEntityToDto(entity: Game): any {
    return entity;
  }
}
