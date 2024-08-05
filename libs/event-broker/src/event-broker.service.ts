import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class EventBrokerService {
  constructor(
    @Inject('EVENT_BROKER') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('new-topic-name');
    await this.kafkaClient.connect();
  }

  async sendMessage(message: any) {
    // this.loggerService.info('Sending message to Kafkaa');
    console.log('Sending message to Kafka');
    this.kafkaClient.emit('new-topic-name', message);
  }
}
