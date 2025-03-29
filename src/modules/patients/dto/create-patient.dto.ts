import { gender } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(gender)
  gender?: gender;

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
