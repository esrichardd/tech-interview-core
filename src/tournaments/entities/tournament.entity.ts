import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Game } from 'src/games/entites/game.entity';
import { Group } from './group.entity';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  externalId: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => Group, (group) => group.tournament)
  groups: Group[];

  @OneToMany(() => Game, (game) => game.tournament)
  games: Game[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
