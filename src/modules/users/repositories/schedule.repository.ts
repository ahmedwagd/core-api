import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateScheduleDto } from 'src/modules/users/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/modules/users/dto/update-schedule.dto';

@Injectable()
export class ScheduleRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: {
        day_of_week: createScheduleDto.day_of_week,
        available_from: createScheduleDto.available_from,
        available_to: createScheduleDto.available_to,
        user_id: createScheduleDto.user_id
      }
    });
  }

  async update(userId: number, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.updateMany({
      where: { user_id: userId },
      data: {
        day_of_week: updateScheduleDto.day_of_week,
        available_from: updateScheduleDto.available_from,
        available_to: updateScheduleDto.available_to
      }
    });
  }
}