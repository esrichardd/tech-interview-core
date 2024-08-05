import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@libs/logger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: { brokers: ['tech-interview-kafka:9093'] },
  //     consumer: { groupId: `event-broker-consumer` },
  //   },
  // });

  // Aumentar el límite del tamaño del cuerpo de la solicitud
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // await app.startAllMicroservices();
  await app.listen(PORT, () => {
    logger.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
  });
}

bootstrap();
