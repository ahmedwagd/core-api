import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTreatmentPlanDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  patientId: number;
}
