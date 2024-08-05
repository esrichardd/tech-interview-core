import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventBrokerModule } from '@libs/event-broker';

@Module({
  imports: [EventBrokerModule],
  controllers: [EventsController],
  providers: [],
})
export class EventsModule {}
