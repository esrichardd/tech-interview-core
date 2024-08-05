import { AbstractCrudHandler } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { FavoriteTournament } from '../entites/favorite-tournament.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@libs/logger';

@Injectable()
export class FavoriteTournamentService extends AbstractCrudHandler<FavoriteTournament> {
  constructor(
    @InjectRepository(FavoriteTournament)
    private favoriteTournamentRepository: Repository<FavoriteTournament>,
    protected readonly loggerService: LoggerService,
  ) {
    super(favoriteTournamentRepository, loggerService);
  }

  protected mapEntityToDto(entity: FavoriteTournament): any {
    return entity;
  }
}
