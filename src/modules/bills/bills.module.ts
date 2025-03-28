import { Module } from '@nestjs/common';
import { BillsController } from './controllers/bills.controller';
import { BillsService } from './services/bills.service';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
