import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@libs/logger';
import { AbstractCrudHandler } from '@libs/utils';
import { Tournament } from '../entities/tournament.entity';
import { GroupService } from './group.service';
import { TeamsService } from 'src/teams/services/teams.service';
import { GroupTeamService } from './group-team.service';
import { GamesService } from 'src/games/services/games.services';

@Injectable()
export class TournamentsService extends AbstractCrudHandler<Tournament> {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    private readonly groupService: GroupService,
    private readonly teamsService: TeamsService,
    private readonly groupTeamService: GroupTeamService,
    private readonly gamesService: GamesService,
    protected readonly loggerService: LoggerService,
  ) {
    super(tournamentRepository, loggerService);
  }

  async createTournamentWithAssociations(createTournamentDto: any) {
    const { externalId, name, country, groupLeague } = createTournamentDto;

    const tournament = await this.create({
      externalId,
      name,
      country,
    });

    const groups = await Promise.all(
      groupLeague.map(async (groupDto) => {
        return await this.groupService.create({
          ...groupDto,
          tournament,
        });
      }),
    );

    const createdTeams = {};

    await Promise.all(
      groupLeague.map(async (groupDto, index) => {
        const group = groups[index];
        await Promise.all(
          groupDto.teams.map(async (teamDto) => {
            const team = await this.teamsService.create({
              ...teamDto,
            });

            if (!createdTeams[group.id]) {
              createdTeams[group.id] = [];
            }

            createdTeams[group.id].push(team);

            await this.groupTeamService.create({
              group,
              team,
            });
          }),
        );
      }),
    );
  }

  async createGames(createGamesDto: any) {
    const { tournamentId, groupId, matches } = createGamesDto;

    const tournament = await this.findOne({
      where: { externalId: tournamentId },
    });

    const group = await this.groupService.findOne({
      where: { externalId: groupId },
    });

    await Promise.all(
      matches.map(async (gameDto) => {
        const localTeam = await this.teamsService.findOne({
          where: { externalId: gameDto.externalLocalTeamId },
        });

        const visitorTeam = await this.teamsService.findOne({
          where: { externalId: gameDto.externalVisitorTeamId },
        });

        const game = await this.gamesService.findOne({
          where: { externalId: gameDto.externalId },
        });

        if (game) {
          return;
        }

        await this.gamesService.create({
          ...gameDto,
          externalId: gameDto.matchId,
          tournament,
          group,
          localTeam,
          visitorTeam,
        });
      }),
    );
  }

  async getTournamentsWithGroups() {
    const tournaments = await this.findWithOptions({
      relations: ['groups'],
    });

    return tournaments;
  }

  protected mapEntityToDto(entity: Tournament): any {
    return entity;
  }
}
