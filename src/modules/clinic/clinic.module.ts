import { Module } from '@nestjs/common';
import { ClinicController } from './controllers/clinic.controller';
import { ClinicService } from './services/clinic.service';
import { ClinicRepository } from './repositories/clinic.repository';

@Module({
  imports: [],
  controllers: [ClinicController],
  providers: [ClinicService, ClinicRepository],
  exports: [ClinicService, ClinicRepository],
})
export class ClinicModule {}
