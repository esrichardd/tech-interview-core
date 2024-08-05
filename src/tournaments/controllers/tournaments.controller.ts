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
import { TournamentsService } from '../services/tournaments.service';
import { GroupService } from '../services/group.service';

@ApiTags('Tournaments')
@Controller('tournaments')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class TournamentsController {
  constructor(
    private readonly tournamentsService: TournamentsService,
    private readonly groupService: GroupService,
  ) {}

  @Post()
  create(@Body() request: any) {
    return this.tournamentsService.create(request);
  }

  @Get()
  findAll() {
    return this.tournamentsService.find();
  }

  @Get('/groups')
  async getTournamentWithGroups() {
    return this.tournamentsService.getTournamentsWithGroups();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: any) {
    return this.tournamentsService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tournamentsService.delete(id);
  }

  @Post('/with-associated-data')
  async createGroupsWithTeams(@Body() request: any) {
    return this.tournamentsService.createTournamentWithAssociations(request);
  }

  @Post('/games')
  async createGames(@Body() request: any) {
    return this.tournamentsService.createGames(request);
  }
}
