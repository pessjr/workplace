import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  index(): string {
    return this.roomsService.getHello();
  }
}
