import { EventBrokerService } from '@libs/event-broker';
import { Controller, Post } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('events')
export class EventsController {
  constructor(private readonly eventBrokerService: EventBrokerService) {}

  @Post()
  async createEvent() {
    await this.eventBrokerService.sendMessage({ message: 'Hello from event' });
  }

  @MessagePattern('new-topic-name')
  async handleMessage(@Payload() message: any) {
    // this.loggerService.info('Received message from Kafka');
    console.log('Received message from Kafka ->', message);
  }

  @EventPattern('new-topic-name')
  async handleEvent(@Payload() message: any) {
    // this.loggerService.info('Received event from Kafka');
    console.log('Received event from Kafka ->', message);
  }
}
