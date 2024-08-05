import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Group } from 'src/tournaments/entities/group.entity';
import { Stage } from 'src/tournaments/entities/stage.entity';
import { GameEvent } from './game-event.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  externalId: string;

  @ManyToOne(() => Tournament, (tournament) => tournament.games)
  @JoinColumn({ name: 'tournamentId' })
  tournament: Tournament;

  @ManyToOne(() => Team, (team) => team.localGames)
  @JoinColumn({ name: 'localTeamId' })
  localTeam: Team;

  @ManyToOne(() => Team, (team) => team.visitorGames)
  @JoinColumn({ name: 'visitorTeamId' })
  visitorTeam: Team;

  @ManyToOne(() => Group, (group) => group.games, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Stage, (stage) => stage.games, { nullable: true })
  @JoinColumn({ name: 'stageId' })
  stage: Stage;

  @OneToMany(() => GameEvent, (event) => event.game)
  events: GameEvent[];

  @Column({ nullable: true })
  localGoals: number;

  @Column({ nullable: true })
  visitorGoals: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
