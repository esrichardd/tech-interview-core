import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { FavoriteGame } from './favorite-game.entity';
import { FavoriteTournament } from './favorite-tournament.entity';
import { FavoriteTeam } from './favorite-team.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => FavoriteGame, (favoriteGame) => favoriteGame.user)
  favoriteGames: FavoriteGame[];

  @OneToMany(
    () => FavoriteTournament,
    (favoriteTournament) => favoriteTournament.user,
  )
  favoriteTournaments: FavoriteTournament[];

  @OneToMany(() => FavoriteTeam, (favoriteTeam) => favoriteTeam.user)
  favoriteTeams: FavoriteTeam[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
