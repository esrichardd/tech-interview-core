import { Module } from '@nestjs/common';
import { EventBrokerService } from './event-broker.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EVENT_BROKER',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['tech-interview-kafka:9093'] },
          consumer: { groupId: 'event-broker-consumer' },
        },
      },
    ]),
  ],
  providers: [EventBrokerService],
  exports: [EventBrokerService],
})
export class EventBrokerModule {}
