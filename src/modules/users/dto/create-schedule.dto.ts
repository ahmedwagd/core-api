import { IsDate, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { days_of_week } from '@prisma/client';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsEnum(days_of_week)
  dayOfWeek: days_of_week;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  availableFrom: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  availableTo: Date;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}