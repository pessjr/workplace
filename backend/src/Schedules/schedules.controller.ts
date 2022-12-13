import { Controller, Get } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller()
export class SchedulesController {
  constructor(private readonly schedules: SchedulesService) {}

  @Get()
  index(): string {
    return this.schedules.getHello();
  }
}
