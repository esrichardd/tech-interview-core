import { AbstractCrudHandler } from '@libs/utils';
import { Injectable } from '@nestjs/common';
import { FavoriteGame } from '../entites/favorite-game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@libs/logger';
import { FavoriteGameResponseDto } from '@libs/sdk-gateway-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FavoriteGameService extends AbstractCrudHandler<FavoriteGame> {
  constructor(
    @InjectRepository(FavoriteGame)
    private favoriteGameRepository: Repository<FavoriteGame>,
    protected readonly loggerService: LoggerService,
  ) {
    super(favoriteGameRepository, loggerService);
  }

  protected mapEntityToDto(entity: FavoriteGame): FavoriteGameResponseDto {
    return plainToInstance(FavoriteGameResponseDto, entity);
  }
}
