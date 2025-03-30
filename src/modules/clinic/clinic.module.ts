import { Module } from '@nestjs/common';
import { ClinicController } from 'src/modules/clinic/controllers/clinic.controller';
import { ClinicService } from 'src/modules/clinic/services/clinic.service';
import { ClinicRepository } from 'src/modules/clinic/repositories/clinic.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ClinicController],
  providers: [ClinicService, PrismaService, ClinicRepository],
  exports: [ClinicService, ClinicRepository],
})
export class ClinicModule { }
