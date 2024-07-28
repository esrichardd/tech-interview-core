import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './db-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => {
        const { mysql } = configService;
        const { password, port, user, host, database } = mysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [dbConfig.KEY],
    }),
  ],
  providers: [],
  exports: [],
})
export class PersistenceModule {}
