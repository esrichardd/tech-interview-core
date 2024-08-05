import { IsNotEmpty, IsString } from 'class-validator';
import { FavoriteGameDto } from '../common/favorite-game.dto';

export class FavoriteGameResponseDto extends FavoriteGameDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
