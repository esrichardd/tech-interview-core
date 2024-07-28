import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  externalId: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.games)
  @JoinColumn({ name: 'tournamentId' })
  tournament: string;

  @ManyToOne(() => Team, (team) => team.localGames)
  @JoinColumn({ name: 'localTeamId' })
  localTeam: Team;

  @ManyToOne(() => Team, (team) => team.visitorGames)
  @JoinColumn({ name: 'visitorTeamId' })
  visitorTeam: Team;

  @Column()
  localGoals: number;

  @Column()
  visitorGoals: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
