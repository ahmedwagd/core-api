import { invoice_status } from '@prisma/client';
import { IsDecimal, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateBillDto {
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  amount: string;

  @IsOptional()
  @IsEnum(invoice_status)
  invoiceStatus?: invoice_status;
}
