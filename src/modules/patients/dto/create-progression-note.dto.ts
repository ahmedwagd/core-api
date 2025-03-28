import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class CreateProgressionNoteDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  patientId: number;
}
