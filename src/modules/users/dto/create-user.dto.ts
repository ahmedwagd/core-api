import { gender, Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  gender?: gender;

  @IsOptional()
  @IsString()
  role?: Role;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  license?: string;

  @IsOptional()
  @IsString()
  social_id?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthday?: Date;
}
