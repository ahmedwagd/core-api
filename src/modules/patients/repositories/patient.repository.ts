// src/users/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

@Injectable()
export class PatientRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: createPatientDto,
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone: true,
        gender: true,
        birthday: true,
        occupation: true,
        weight: true,
        length: true,
        history: true,
      },
    });
  }

  async findOne(patientId: number) {
    return this.prisma.patient.findUnique({
      where: { id: patientId },
    });
  }

  async update(patientId: number, updatePatientDto: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id: patientId },
      data: updatePatientDto,
    });
  }

  async delete(patientId: number) {
    return this.prisma.patient.delete({
      where: { id: patientId },
    });
  }

}
