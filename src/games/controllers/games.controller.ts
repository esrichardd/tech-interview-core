import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GamesService } from '../services/games.service';

@ApiTags('Games')
@Controller('games')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne({
      where: { id },
      relations: ['tournament', 'localTeam', 'visitorTeam', 'group', 'stage'],
    });
  }

  @Get('tournament/:id')
  findByTournament(@Param('id') id: string) {
    return this.gamesService.findByTournament(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: any) {
    return this.gamesService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gamesService.delete(id);
  }

  @Post('event')
  addGameEvent(@Body() request: any) {
    return this.gamesService.addGameEvent(request);
  }

  @Get(':id/events')
  getGameEvents(@Param('id') id: string) {
    return this.gamesService.getGameEvents(id);
  }
}
