import { Module } from '@nestjs/common';
import { User } from './entites/user.entity';
import { FavoriteGame } from './entites/favorite-game.entity';
import { FavoriteTournament } from './entites/favorite-tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@libs/logger';
import { FavoriteTeam } from './entites/favorite-team.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      FavoriteGame,
      FavoriteTournament,
      FavoriteTeam,
    ]),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class UsersModule {}
