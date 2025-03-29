import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { PatientsService } from '../services/patients.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PatientsController {
  constructor(private readonly _patientsService: PatientsService) { }

  @Roles('ADMIN', 'MANAGER', 'RECEPTIONIST', 'DOCTOR')
  @Post()
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    return this._patientsService.create(createPatientDto);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTIONIST', 'DOCTOR')
  @Get()
  async getAllPatients() {
    return this._patientsService.findAll();
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTIONIST', 'DOCTOR')
  @Get(':id')
  async getPatient(@Param('id', ParseIntPipe) id: number) {
    return this._patientsService.findOne(id);
  }

  @Roles('ADMIN', 'MANAGER', 'RECEPTIONIST', 'DOCTOR')
  @Patch(':id')
  async updatePatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this._patientsService.update(id, updatePatientDto);
  }

  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  async deletePatient(@Param('id', ParseIntPipe) id: number) {
    return this._patientsService.delete(id);
  }
}
