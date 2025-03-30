import { Injectable } from "@nestjs/common";
import { ScheduleRepository } from "../repositories/schedule.repository";
import { CreateScheduleDto } from "../dto/create-schedule.dto";
import { UpdateScheduleDto } from "../dto/update-schedule.dto";

@Injectable()
export class SchedulesService {
  constructor(private readonly scheduleRepository: ScheduleRepository) { }

  async create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepository.create(createScheduleDto);
  }

  async update(userId: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepository.update(userId, updateScheduleDto);
  }
}