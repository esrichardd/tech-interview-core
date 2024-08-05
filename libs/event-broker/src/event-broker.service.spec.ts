import { Test, TestingModule } from '@nestjs/testing';
import { EventBrokerService } from './event-broker.service';

describe('EventBrokerService', () => {
  let service: EventBrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventBrokerService],
    }).compile();

    service = module.get<EventBrokerService>(EventBrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
