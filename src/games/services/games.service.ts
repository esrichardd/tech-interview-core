import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractCrudHandler } from '@libs/utils';
import { LoggerService } from '@libs/logger';
import { Game } from '../entites/game.entity';
import { GameEventsService } from './game-events.service';

@Injectable()
export class GamesService extends AbstractCrudHandler<Game> {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
    private readonly gameEventsService: GameEventsService,
    protected readonly loggerService: LoggerService,
  ) {
    super(gameRepository, loggerService);
  }

  find(): Promise<Game[]> {
    return this.gameRepository.find({
      relations: ['tournament', 'localTeam', 'visitorTeam', 'group', 'stage'],
    });
  }

  findByTournament(id: string): Promise<Game[]> {
    console.log('id', id);
    return this.gameRepository.find({
      relations: ['tournament', 'localTeam', 'visitorTeam', 'group', 'stage'],
    });
  }

  async addGameEvent(request: any): Promise<any> {
    const game = await this.findById(request.gameId);
    if (!game) {
      throw new Error('Game not found');
    }

    return this.gameEventsService.create({
      ...request,
      game,
    });
  }

  async getGameEvents(id: string): Promise<any> {
    const game = await this.findById(id);
    if (!game) {
      throw new Error('Game not found');
    }

    return this.gameEventsService.findWithOptions({
      where: { game: { id } },
    });
  }

  protected mapEntityToDto(entity: Game): any {
    return entity;
  }
}
