import { gender } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsDecimal, IsEnum, IsOptional, IsString } from "class-validator";


export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
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
