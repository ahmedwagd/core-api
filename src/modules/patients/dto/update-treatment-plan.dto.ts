import { IsOptional, IsString } from "class-validator";

export class UpdateTreatmentPlanDto {
  @IsOptional()
  @IsString()
  description?: string;
}
