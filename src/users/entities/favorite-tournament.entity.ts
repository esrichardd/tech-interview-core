import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { User } from './user.entity';

@Entity()
export class FavoriteTournament {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteGames)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Tournament, (tournament) => tournament.id)
  @JoinColumn()
  tournament: Tournament;

  @CreateDateColumn()
  favoritedAt: Date;
}
