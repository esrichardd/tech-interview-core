import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  AddFavoriteGameRequestDto,
  AddFavoriteTournamentRequestDto,
  CreateUserRequestDto,
} from '@libs/sdk-gateway-dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserRequestDto) {
    return this.usersService.create(body);
  }

  @Post('favorite-game')
  async addFavoriteGame(@Body() body: AddFavoriteGameRequestDto) {
    return this.usersService.addFavoriteGame(body.userId, body.gameId);
  }

  @Get(':id/favorite-games')
  async getFavoriteGames(@Param('id') id: string) {
    return this.usersService.getFavoriteGames(id);
  }

  @Post('favorite-tournament')
  async addFavoriteTournament(@Body() body: AddFavoriteTournamentRequestDto) {
    return this.usersService.addFavoriteTournament(
      body.userId,
      body.tournamentId,
    );
  }

  @Get(':id/favorite-tournaments')
  async getFavoriteTournaments(@Param('id') id: string) {
    return this.usersService.getFavoriteTournaments(id);
  }
}
