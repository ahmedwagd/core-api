import { IsOptional, IsString } from "class-validator";
export class UpdateCancellationLogDto {
  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
