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
import { GamesService } from '../services/games.services';

@ApiTags('Games')
@Controller('games')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  create(@Body() request: any) {
    return this.gamesService.create(request);
  }

  @Get()
  findAll() {
    return this.gamesService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findGameWithTeams(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: any) {
    return this.gamesService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gamesService.delete(id);
  }
}
