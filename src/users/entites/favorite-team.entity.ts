import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Team } from 'src/teams/entities/team.entity';

@Entity()
export class FavoriteTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteTournaments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn()
  team: Team;

  @CreateDateColumn()
  favoritedAt: Date;
}
