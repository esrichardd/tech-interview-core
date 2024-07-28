import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Game } from 'src/games/entites/game.entity';
import { Tournament } from './tournament.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.groups)
  @JoinColumn({ name: 'tournamentId' })
  tournament: Tournament;

  @ManyToMany(() => Team, (team) => team.groups)
  teams: Team[];

  @OneToMany(() => Game, (game) => game.group)
  games: Game[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
