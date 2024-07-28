import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { Team } from 'src/teams/entities/team.entity';

@Entity()
export class GroupTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.id)
  group: Group;

  @ManyToOne(() => Team, (team) => team.id)
  team: Team;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  goalsFor: number;

  @Column({ default: 0 })
  goalsAgainst: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
