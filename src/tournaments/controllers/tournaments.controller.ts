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

@ApiTags('Tournaments')
@Controller('tournaments')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  create(@Body() request: any) {
    return this.tournamentsService.create(request);
  }

  @Get()
  findAll() {
    return this.tournamentsService.find();
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
}
