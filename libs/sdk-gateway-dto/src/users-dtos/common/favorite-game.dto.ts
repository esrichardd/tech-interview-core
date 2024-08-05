import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FavoriteGameDto {
  @IsOptional()
  game?: any;

  @IsDate()
  @Type(() => Date)
  favoritedAt: Date;
}
