import { IsDate, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { days_of_week } from '@prisma/client';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsEnum(days_of_week)
  day_of_week: days_of_week;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  available_from: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  available_to: Date;

  @IsNotEmpty()
  @IsInt()
  user_id: number;
}