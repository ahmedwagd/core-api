import { Injectable } from '@nestjs/common';
import { ClinicRepository } from '../repositories/clinic.repository';

@Injectable()
export class ClinicService {
  constructor(private readonly _clinicRepository: ClinicRepository) {}
  
}
