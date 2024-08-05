import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteTournamentRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  tournamentId: string;
}
