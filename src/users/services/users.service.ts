import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../entites/user.entity';
import { AbstractCrudHandler } from '@libs/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '@libs/logger';
import { FavoriteGameService } from './favorite-game.service';
import { GamesService } from 'src/games/services/games.services';
import { FavoriteTournamentService } from './favorite-tournament.service';
import { TournamentsService } from 'src/tournaments/services/tournaments.service';
import { UserResponseDto } from '@libs/sdk-gateway-dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService extends AbstractCrudHandler<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly favoriteGameService: FavoriteGameService,
    private readonly favoriteTournamentService: FavoriteTournamentService,
    private readonly gamesService: GamesService,
    private readonly tournamentsService: TournamentsService,
    protected readonly loggerService: LoggerService,
  ) {
    super(userRepository, loggerService);
  }

  async addFavoriteGame(userId: string, gameId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }

    const game = await this.gamesService.findById(gameId);
    if (!game) {
      throw new ConflictException('Game not found');
    }

    const existingFavorite = await this.favoriteGameService.findOne({
      where: { user: { id: userId }, game: { id: gameId } },
    });
    if (existingFavorite) {
      throw new ConflictException('Game is already in favorites');
    }

    return this.favoriteGameService.create({
      user,
      game,
      favoritedAt: new Date(),
    });
  }

  async getFavoriteGames(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }

    return this.favoriteGameService.findWithOptions({
      where: { user: { id: userId } },
      relations: ['game'],
    });
  }

  async addFavoriteTournament(userId: string, tournamentId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }

    const tournament = await this.tournamentsService.findWithOptions({
      where: { id: tournamentId },
      relations: ['groups', 'groups.games'],
    });
    if (!tournament) {
      throw new ConflictException('Tournament not found');
    }

    const existingFavorite = await this.favoriteTournamentService.findOne({
      where: { user: { id: userId }, tournament: { id: tournamentId } },
    });
    if (existingFavorite) {
      throw new ConflictException('Tournament is already in favorites');
    }

    const favoriteTournament = await this.favoriteTournamentService.create({
      user,
      tournament: tournament[0],
      favoritedAt: new Date(),
    });

    const favoriteGamePromises = tournament[0].groups.flatMap((group) =>
      group.games.map((game) =>
        this.addFavoriteGame(userId, game.id).catch((error) => {
          this.loggerService.error(error);
          return null;
        }),
      ),
    );

    await Promise.all(favoriteGamePromises);

    return favoriteTournament;
  }

  async getFavoriteTournaments(userId: string) {
    const user = await this.findById(userId);
    if (!user) {
      throw new ConflictException('User not found');
    }

    return this.favoriteTournamentService.findWithOptions({
      where: { user: { id: userId } },
      relations: ['tournament', 'tournament.groups', 'tournament.groups.games'],
    });
  }

  protected mapEntityToDto(entity: User): UserResponseDto {
    return plainToInstance(UserResponseDto, entity);
  }
}
