import { Module } from '@nestjs/common';
import { RoomsModule } from './Rooms/rooms.module';
import { SchedulesModule } from './Schedules/schedules.module';
import { SessionModule } from './Session/session.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [UserModule, SessionModule, SchedulesModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
