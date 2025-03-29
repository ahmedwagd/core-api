import { Module } from '@nestjs/common';
import { PatientsController } from './controllers/patients.controller';
import { PatientsService } from './services/patients.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientRepository } from './repositories/patient.repository';
@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService, PatientRepository],
  imports: [PrismaModule],
})
export class PatientsModule { }
