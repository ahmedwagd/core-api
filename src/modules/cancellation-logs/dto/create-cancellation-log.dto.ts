import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCancellationLogDto {
  @IsNotEmpty()
  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  appointmentId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
