// import { PartialType } from '@nestjs/swagger';
// import { CreateBillDto } from './create-bill.dto';

import { invoice_status } from "@prisma/client";
import { IsDecimal, IsEnum, IsOptional } from "class-validator";

// export class UpdateBillDto extends PartialType(CreateBillDto) {}
export class UpdateBillDto {
  @IsOptional()
  @IsDecimal({ decimal_digits: '2' })
  amount: string;

  @IsOptional()
  @IsEnum(invoice_status)
  invoiceStatus?: invoice_status;
}
