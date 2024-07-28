import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Game } from 'src/games/entites/game.entity';
import { Group } from 'src/tournaments/entities/group.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @ManyToMany(() => Group, (group) => group.teams)
  groups: Group[];

  @OneToMany(() => Game, (game) => game.localTeam)
  localGames: Game[];

  @OneToMany(() => Game, (game) => game.visitorTeam)
  visitorGames: Game[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
