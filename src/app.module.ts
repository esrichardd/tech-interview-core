import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '@libs/persistence';
import { RedisModule } from '@libs/redis';
import dbConfig from '@libs/persistence/db-config';
import redisConfig from '@libs/redis/redis-config';
import { TeamsModule } from './teams/teams.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { GamesModule } from './games/games.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@libs/logger';
import { StatusModule } from '@libs/healthcheck/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/usr/src/tech-interview-core/.env',
      load: [dbConfig, redisConfig],
      isGlobal: true,
    }),
    LoggerModule,
    StatusModule,
    PersistenceModule,
    RedisModule,
    TeamsModule,
    TournamentsModule,
    GamesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
