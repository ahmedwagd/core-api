import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { ScheduleRepository } from './repositories/schedule.repository';
import { SchedulesService } from './services/schedules.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, SchedulesService, PrismaService, UserRepository, ScheduleRepository],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule { }
