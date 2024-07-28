import { registerAs } from '@nestjs/config';

export default registerAs('redisConfig', () => {
  return {
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || '6379'),
      ttl: parseInt(process.env.REDIS_TTL || '3600'),
    },
  };
});
