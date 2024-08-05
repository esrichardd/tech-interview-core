import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteGameRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  gameId: string;
}
