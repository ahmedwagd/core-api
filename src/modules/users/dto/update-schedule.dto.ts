import { days_of_week } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdateScheduleDto {

  @IsOptional()
  @IsEnum(days_of_week)
  day_of_week?: days_of_week;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  available_from?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  available_to?: Date;

}