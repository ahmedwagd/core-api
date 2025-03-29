import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';
export class CreateExaminationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  subjectivePainScale?: number;

  @IsOptional()
  @IsString()
  subjectiveLocation?: string;

  @IsOptional()
  @IsString()
  subjectiveDescription?: string;

  @IsOptional()
  @IsString()
  subjectiveAggravatingFactors?: string;

  @IsOptional()
  @IsString()
  objectivePosture?: string;

  @IsOptional()
  @IsString()
  objectiveRegion?: string;

  @IsOptional()
  @IsString()
  objectivePhysiologicalMotion?: string;

  @IsOptional()
  @IsString()
  palpation?: string;

  @IsNotEmpty()
  @IsInt()
  patientId: number;
}
