import {
  IsInt,
  IsISO8601,
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

  // @IsOptional()
  // @IsEnum(appointmentStatus)
  // appointmentStatus?: AppointmentStatus;

  @IsNotEmpty()
  @IsISO8601()
  appointmentDate: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
