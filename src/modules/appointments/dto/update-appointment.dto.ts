import { appointment_status } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateAppointmentDto {
  @IsOptional()
  @IsInt()
  assignedToId?: number;

  @IsOptional()
  @IsInt()
  billId?: number;

  @IsOptional()
  @IsEnum(appointment_status)
  appointmentStatus?: appointment_status;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  appointmentDate?: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
