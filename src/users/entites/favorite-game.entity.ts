import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Game } from 'src/games/entites/game.entity';

@Entity()
export class FavoriteGame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.favoriteTournaments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Game, (game) => game.id)
  @JoinColumn()
  game: Game;

  @CreateDateColumn()
  favoritedAt: Date;
}
