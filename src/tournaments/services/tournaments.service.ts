import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@libs/logger';
import { AbstractCrudHandler } from '@libs/utils';
import { Tournament } from '../entities/tournament.entity';

@Injectable()
export class TournamentsService extends AbstractCrudHandler<Tournament> {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    protected readonly loggerService: LoggerService,
  ) {
    super(tournamentRepository, loggerService);
  }

  protected mapEntityToDto(entity: Tournament): any {
    return entity;
  }
}
