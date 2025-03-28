import { Type } from 'class-transformer';
import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  // @IsOptional()
  // @IsEnum(gender)
  // gender?: gender;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;

  @IsOptional()
  @IsString()
  occupation?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  weight?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  length?: string;

  @IsOptional()
  @IsString()
  history?: string;
}
