import { Module } from '@nestjs/common';
import { User } from './entites/user.entity';
import { FavoriteGame } from './entites/favorite-game.entity';
import { FavoriteTournament } from './entites/favorite-tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@libs/logger';
import { FavoriteTeam } from './entites/favorite-team.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { GamesService } from 'src/games/services/games.services';
import { Game } from 'src/games/entites/game.entity';
import { FavoriteGameService } from './services/favorite-game.service';
import { TournamentsService } from 'src/tournaments/services/tournaments.service';
import { FavoriteTournamentService } from './services/favorite-tournament.service';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { GroupService } from 'src/tournaments/services/group.service';
import { TeamsService } from 'src/teams/services/teams.service';
import { GroupTeamService } from 'src/tournaments/services/group-team.service';
import { Group } from 'src/tournaments/entities/group.entity';
import { Team } from 'src/teams/entities/team.entity';
import { GroupTeam } from 'src/tournaments/entities/group-team.entity';
import { GameEventsService } from 'src/games/services/game-events.service';
import { GameEvent } from 'src/games/entites/game-event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Game,
      GameEvent,
      Tournament,
      Group,
      Team,
      GroupTeam,
      FavoriteGame,
      FavoriteTournament,
      FavoriteTeam,
    ]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    GamesService,
    GameEventsService,
    FavoriteGameService,
    TournamentsService,
    GroupService,
    TeamsService,
    GroupTeamService,
    FavoriteTournamentService,
  ],
})
export class UsersModule {}
