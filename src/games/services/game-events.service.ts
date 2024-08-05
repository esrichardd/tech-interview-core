import { LoggerService } from '@libs/logger';
import { AbstractCrudHandler } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEvent } from '../entities/game-event.entity';

@Injectable()
export class GameEventsService extends AbstractCrudHandler<GameEvent> {
  constructor(
    @InjectRepository(GameEvent)
    private gameEventRepository: Repository<GameEvent>,
    protected readonly loggerService: LoggerService,
  ) {
    super(gameEventRepository, loggerService);
  }

  protected mapEntityToDto(entity: GameEvent): any {
    return entity;
  }
}
