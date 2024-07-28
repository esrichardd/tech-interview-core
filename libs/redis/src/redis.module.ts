import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import redisConfig from './redis-config';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigType<typeof redisConfig>) => {
        const { redis } = configService;
        const { port, host } = redis;
        return {
          store: await redisStore({
            socket: {
              host,
              port,
            },
          }),
        };
      },
      inject: [redisConfig.KEY],
    }),
  ],
  providers: [],
  exports: [CacheModule],
})
export class RedisModule {}
