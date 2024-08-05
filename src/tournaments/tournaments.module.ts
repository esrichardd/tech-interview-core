import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@libs/logger';
import { Tournament } from './entities/tournament.entity';
import { Group } from './entities/group.entity';
import { Stage } from './entities/stage.entity';
import { GroupTeam } from './entities/group-team.entity';
import { TournamentsController } from './controllers/tournaments.controller';
import { TournamentsService } from './services/tournaments.service';
import { GroupService } from './services/group.service';
import { GroupTeamService } from './services/group-team.service';
import { TeamsService } from 'src/teams/services/teams.service';
import { Team } from 'src/teams/entities/team.entity';
import { GroupController } from './controllers/groups.controller';
import { Game } from 'src/games/entites/game.entity';
import { GameEventsService } from 'src/games/services/game-events.service';
import { GameEvent } from 'src/games/entites/game-event.entity';
import { GamesService } from 'src/games/services/games.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tournament,
      Group,
      Stage,
      Team,
      Game,
      GameEvent,
      GroupTeam,
    ]),
    LoggerModule,
  ],
  controllers: [TournamentsController, GroupController],
  providers: [
    GroupService,
    TournamentsService,
    GroupTeamService,
    TeamsService,
    GamesService,
    GameEventsService,
  ],
})
export class TournamentsModule {}
