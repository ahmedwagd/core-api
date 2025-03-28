import { IsDecimal, IsNotEmpty } from 'class-validator';
export class CreateBillDto {
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  amount: string;

  // @IsOptional()
  // @IsEnum(invoiceStatus)
  // invoiceStatus?: InvoiceStatus;
}
