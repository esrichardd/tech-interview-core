import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@libs/logger';
import { Tournament } from './entities/tournament.entity';
import { TournamentsController } from './controllers/tournaments.controller';
import { TournamentsService } from './services/tournaments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), LoggerModule],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
