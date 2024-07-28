import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@libs/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const logger = new LoggerService();

  await app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
  });
}
bootstrap();
