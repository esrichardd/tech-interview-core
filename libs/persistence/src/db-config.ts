import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  return {
    mysql: {
      database: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_TCP_PORT || '3307'),
      password: process.env.MYSQL_PASSWORD,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
    },
  };
});
