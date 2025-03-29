import { appointment_status } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';


export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;

  @IsNotEmpty()
  @IsInt()
  assignedToId: number;

  @IsNotEmpty()
  @IsInt()
  clinicId: number;

  @IsNotEmpty()
  @IsInt()
  patientId: number;

  @IsOptional()
  @IsInt()
  billId?: number;

  @IsOptional()
  @IsEnum(appointment_status)
  appointmentStatus?: appointment_status;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  appointmentDate: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
