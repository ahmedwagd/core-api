import { Injectable } from '@nestjs/common';
import { PatientRepository } from '../repositories/patient.repository';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly _patientRepository: PatientRepository) { }

  async create(createPatientDto: CreatePatientDto) {
    return await this._patientRepository.create(createPatientDto);
  }

  async findAll() {
    return this._patientRepository.findAll();
  }

  async findOne(patientId: number) {
    return this._patientRepository.findOne(patientId);
  }

  async update(patientId: number, updatePatientDto: UpdatePatientDto) {
    return this._patientRepository.update(patientId, updatePatientDto);
  }

  async delete(patientId: number) {
    return this._patientRepository.delete(patientId);
  }
}
