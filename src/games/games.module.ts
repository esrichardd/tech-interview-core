import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LoggerModule } from '@libs/logger';
import { Game } from './entites/game.entity';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';
import { GameEvent } from './entites/game-event.entity';
import { GameEventsService } from './services/game-events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GameEvent]), LoggerModule],
  controllers: [GamesController],
  providers: [GamesService, GameEventsService],
})
export class GamesModule {}
