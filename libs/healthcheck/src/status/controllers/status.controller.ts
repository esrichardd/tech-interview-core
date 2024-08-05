import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('')
export class StatusController {
  @Get('ping')
  @HttpCode(HttpStatus.OK)
  getPing() {
    return 'App is ready now!';
  }
}
