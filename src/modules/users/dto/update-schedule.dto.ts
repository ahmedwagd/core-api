import { days_of_week } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class CreateScheduleDto {

  @IsOptional()
  @IsEnum(days_of_week)
  dayOfWeek: days_of_week;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  availableFrom: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  availableTo: Date;
}