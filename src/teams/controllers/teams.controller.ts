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
import {
  CreateTeamRequestDto,
  UpdateTeamRequestDto,
} from '@libs/sdk-gateway-dto';
import { TeamsService } from '../services/teams.service';

@ApiTags('Teams')
@Controller('teams')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ClassSerializerInterceptor)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() request: CreateTeamRequestDto) {
    return this.teamsService.create(request);
  }

  @Get()
  findAll() {
    return this.teamsService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() request: UpdateTeamRequestDto) {
    return this.teamsService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.teamsService.delete(id);
  }
}
