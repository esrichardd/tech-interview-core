import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LoggerModule } from '@libs/logger';
import { Game } from './entites/game.entity';
import { GamesService } from './services/games.services';
import { GamesController } from './controllers/games.controller';
import { Event } from './entites/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Event]), LoggerModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
