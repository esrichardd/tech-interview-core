import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { GroupService } from '../services/group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupsService: GroupService) {}

  @Get()
  async findAll() {
    return this.groupsService.find();
  }

  @Get(':id/games')
  async getGamesByGroup(@Param('id') id: string, @Query('date') date: string) {
    return this.groupsService.getGamesByGroup(id, date);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupsService.delete(id);
  }
}
