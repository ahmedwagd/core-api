// src/users/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
// import { eq } from 'drizzle-orm';
// import { DrizzleDBType } from 'src/common/types/drizzle-database';
// import { DRIZZLE } from 'src/database/database.module';
// import { clinic } from 'src/database/schema/clinic.schema';

@Injectable()
export class ClinicRepository {
  constructor( private db) {}
  // async create(clinicData: any) {
  //   return await this.db.insert(clinic).values(clinicData).returning();
  // }

  // async findAll() {
  //   return await this.db.query.clinic.findMany();
  // }
  // async findOne(id: number) {
  //   return await this.db
  //     .select()
  //     .from(clinic)
  //     .where(eq(clinic.id, id))
  //     .limit(1)
  //     .then((res) => res[0]);
  // }
}
